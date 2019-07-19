const { disallow } = require('feathers-hooks-common');
const generate = require('nanoid/generate');

const addId = async context => {
  context.data = { id: generate('abcdefghijklmnopqrstuvwxyz', 4) };

  return context;
};

const addEmptyUsers = async context => {
  Object.assign(context.data, { users: [] });

  return context;
};

const joinRoom = async context => {
  const {
    data: { operation, name },
    id
  } = context;

  if (operation === 'join') {
    const { users } = await context.service.get(id);
    const leader = {};

    if (!users.length) {
      leader.leader = name;
    }

    users.push(name);

    context.data = { users, ...leader };
  }

  return context;
};

module.exports = {
  before: {
    all: [], //[disallow('rest')],
    find: [], //[disallow('external')],
    get: [],
    create: [addId, addEmptyUsers],
    update: [disallow('external')],
    patch: [joinRoom],
    remove: [disallow('external')]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
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
