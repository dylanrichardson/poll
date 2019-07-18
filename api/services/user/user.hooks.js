const { disallow } = require('feathers-hooks-common');
const { BadRequest } = require('@feathersjs/errors');

const validate = context => {
  const { name } = context.data;
  if (!name) {
    throw new BadRequest('User must have a name');
  }

  context.data = { name };

  return context;
};

module.exports = {
  before: {
    all: [disallow('rest')],
    find: [disallow('external')],
    get: [disallow('external')],
    create: [validate],
    update: [disallow('external')],
    patch: [disallow('external')],
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
