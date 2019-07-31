const { disallow } = require('feathers-hooks-common');
const { Conflict, BadRequest } = require('@feathersjs/errors');
const generate = require('nanoid/generate');
const _ = require('lodash');
const logger = require('../../logger');

const addId = async context => {
  context.data = { id: generate('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 4) };

  return context;
};

const addEmptyMembers = async context => {
  Object.assign(context.data, { members: [] });

  return context;
};

const addEmptyQuestion = async context => {
  Object.assign(context.data, { question: null });

  return context;
};

const addEmptyAnswers = async context => {
  Object.assign(context.data, { answers: {} });

  return context;
};

const applyOperation = async context => {
  const {
    data: { operation },
    params
  } = context;

  logger.info(`before app.service('poll').${operation}()`);

  Object.assign(params, { operation });

  switch (operation) {
    case 'join':
      return joinPoll(context);
    case 'leave':
      return leavePoll(context);
    case 'ask':
      return addQuestion(context);
    case 'answer':
      return addAnswer(context);
    case 'toggleResults':
      return toggleResults(context);
    case 'startJoin':
      return startJoin(context);
    default:
      throw new BadRequest('Patching a poll requires a valid operation.');
  }
};

const startJoin = async context => {
  const {
    params: { connection },
    service,
    id: poll
  } = context;

  const { leader } = await service.get(poll);

  if (!leader) {
    Object.assign(connection, { leader: true, poll });

    context.data = { leader: true };
  }

  return context;
};

const joinPoll = async context => {
  const {
    id: poll,
    data: { name },
    service,
    app,
    params: { connection }
  } = context;

  const { members, answers } = await service.get(poll);
  const leader = {};

  if (members.includes(name)) {
    throw new Conflict('A user with the same name is already in the poll.');
  }

  if (_.keys(answers).includes(name)) {
    throw new Conflict(
      'A user with the same name has already voted in the poll.'
    );
  }

  if (!name || name === '') {
    throw new BadRequest('Join operation requires a name.');
  }

  if (connection.leader) {
    leader.leader = name;
  }

  members.push(name);

  context.data = { members, ...leader };

  Object.assign(connection, { name, poll });

  app.channel(poll).join(connection);

  return context;
};

const leavePoll = async context => {
  const {
    service,
    params: {
      connection,
      connection: { poll, name }
    },
    app
  } = context;

  if (connection.name) {
    const { members } = await service.get(poll);
    const leader = {};

    const index = members.indexOf(name);
    if (index >= 0) {
      members.splice(index, 1);
    }

    if (members.length) {
      leader.leader = members[0];
    }

    context.data = { members, ...leader };

    app.channel(poll).leave(connection);
  } else {
    context.data = {};
  }

  return context;
};

const addQuestion = async context => {
  const {
    data: { question },
    params: {
      connection: { name }
    },
    id: poll,
    service
  } = context;

  const { leader } = await service.get(poll);

  if (name !== leader) {
    throw new Forbidden('Ask operation requires the leader.');
  }

  if (!question || question === '') {
    throw new BadRequest('Ask operation requires a question.');
  }

  context.data = { question, answers: {} };

  return context;
};

const addAnswer = async context => {
  const {
    id: poll,
    data: { answer },
    service,
    params: {
      connection: { name }
    }
  } = context;

  if (!name) {
    throw new BadRequest('Answer operation requires a name.');
  }

  if (!answer) {
    throw new BadRequest('Answer operation requires an answer.');
  }

  const { answers } = await service.get(poll);

  context.data = { answers: { ...answers, [name]: answer.trim() } };

  return context;
};

const toggleResults = async context => {
  const {
    id: poll,
    data: { showResults },
    service,
    params: {
      connection: { name }
    }
  } = context;

  const { leader } = await service.get(poll);

  if (name !== leader) {
    throw new Forbidden('Toggle results operation requires the leader.');
  }

  if (showResults === null || showResults === undefined) {
    throw new BadRequest(
      'Toggle results operation requires a showResults parameter.'
    );
  }

  context.data = { showResults };

  return context;
};

const removePoll = async context => {
  const {
    id: poll,
    result: { members },
    params: { operation },
    service
  } = context;

  if (operation === 'leave' && !members.length) {
    await service.remove(poll);
  }

  return context;
};

module.exports = {
  before: {
    all: [disallow('rest')],
    find: [disallow('external')],
    get: [],
    create: [addId, addEmptyMembers, addEmptyQuestion, addEmptyAnswers],
    update: [disallow('external')],
    patch: [applyOperation],
    remove: [disallow('external')]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [removePoll],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
