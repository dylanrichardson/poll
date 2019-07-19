const poll = require('./poll/poll.service.js');

module.exports = app => {
  app.configure(poll);
};
