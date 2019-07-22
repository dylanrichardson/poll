const { disallow } = require('feathers-hooks-common');
const { Conflict, BadRequest } = require('@feathersjs/errors');
const generate = require('nanoid/generate');

const addId = async context => {
  context.data = { id: generate('abcdefghijklmnopqrstuvwxyz', 4) };

  return context;
};

const addEmptyMembers = async context => {
  Object.assign(context.data, { members: [] });

  return context;
};

const addEmptyQuestion = async context => {
  Object.assign(context.data, { question: '' });

  return context;
};

const addEmptyAnswers = async context => {
  Object.assign(context.data, { answers: {} });

  return context;
};

const withOperation = async context => {
  switch (context.data.operation) {
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
    default:
      throw new BadRequest('Patching a poll requires an operation.');
  }
};

const joinPoll = async context => {
  const {
    id,
    data: { operation, name },
    service,
    app,
    params: { connection }
  } = context;

  if (operation === 'join') {
    const { members } = await service.get(id);
    const leader = {};

    if (members.includes(name)) {
      throw new Conflict('A user with the same name is already in the poll.');
    }

    if (!name || name === '') {
      throw new BadRequest('Join operation requires a name.');
    }

    if (!members.length) {
      leader.leader = name;
    }

    members.push(name);

    context.data = { members, ...leader };

    Object.assign(connection, { name, poll: id });

    app.channel(id).join(connection);
  }

  return context;
};

const leavePoll = async context => {
  const {
    id,
    data: { operation },
    service,
    params: {
      connection: { name }
    }
  } = context;

  if (operation === 'leave') {
    const { members } = await service.get(id);
    const leader = {};

    const index = members.indexOf(name);
    if (index > -1) {
      members.splice(index, 1);
    }

    if (members.length) {
      leader.leader = members[0];
    }

    context.data = { members, ...leader };

    app.channel(id).leave(connection);
  }

  return context;
};

const addQuestion = async context => {
  const {
    data: { operation, question },
    params: {
      connection: { name }
    },
    id,
    service
  } = context;

  if (operation === 'ask') {
    const { leader } = await service.get(id);

    if (name !== leader) {
      throw new Forbidden('Ask operation requires the leader.');
    }

    if (!question || question === '') {
      throw new BadRequest('Ask operation requires a question.');
    }

    context.data = { question, answers: {} };
  }

  return context;
};

const addAnswer = async context => {
  const {
    id,
    data: { operation, answer },
    service,
    params: {
      connection: { name }
    }
  } = context;

  if (operation === 'answer') {
    if (!name) {
      throw new BadRequest('Answer operation requires a name.');
    }

    if (!answer) {
      throw new BadRequest('Answer operation requires an answer.');
    }

    const { answers } = await service.get(id);

    context.data = { answers: { ...answers, [name]: answer } };
  }

  return context;
};

const toggleResults = async context => {
  const {
    id,
    data: { operation, showResults },
    service,
    params: {
      connection: { name }
    }
  } = context;

  if (operation === 'toggleResults') {
    const { leader } = await service.get(id);

    if (name !== leader) {
      throw new Forbidden('Toggle results operation requires the leader.');
    }

    if (showResults === null || showResults === undefined) {
      throw new BadRequest(
        'Toggle results operation requires a showResults parameter.'
      );
    }

    context.data = { showResults };
  }

  return context;
};

const removePoll = async context => {
  const {
    id,
    result: { members },
    service
  } = context;

  if (!members.length) {
    await service.remove(id);
  }

  return context;
};

module.exports = {
  before: {
    all: [], //[disallow('rest')],
    find: [], //[disallow('external')],
    get: [],
    create: [addId, addEmptyMembers, addEmptyQuestion, addEmptyAnswers],
    update: [disallow('external')],
    patch: [withOperation],
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
