const { disallow } = require('feathers-hooks-common');
const { BadRequest } = require('@feathersjs/errors');
const generate = require('nanoid/generate');

const addPin = context => {
  context.data = { pin: generate('abcdefghijklmnopqrstuvwxyz', 4) };

  return context;
};

const getRoomByPin = async context => {
  const pin = context.id;

  const { total, data } = await context.service.find({ query: { pin } });

  if (!total) {
    throw new BadRequest('Room with given pin not found');
  }

  context.id = data[0].id;

  return context;
};

module.exports = {
  before: {
    all: [], //disallow('rest')],
    find: [], //disallow('external')],
    get: [getRoomByPin],
    create: [addPin],
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
