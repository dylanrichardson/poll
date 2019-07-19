const { disallow } = require('feathers-hooks-common');
const { Conflict } = require('@feathersjs/errors');
const generate = require('nanoid/generate');

const addId = async context => {
  context.data = { id: generate('abcdefghijklmnopqrstuvwxyz', 4) };

  return context;
};

const addEmptyMembers = async context => {
  Object.assign(context.data, { members: [] });

  return context;
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
    data: { operation, name },
    service
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
  }

  return context;
};

const removePoll = async context => {
  const {
    id,
    data: { members },
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
    create: [addId, addEmptyMembers],
    update: [disallow('external')],
    patch: [joinPoll, leavePoll],
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
