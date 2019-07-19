const room = require('./room/room.service.js');

module.exports = app => {
  app.configure(room);
};
