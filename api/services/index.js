const user = require('./user/user.service.js');
const room = require('./room/room.service.js');

module.exports = app => {
  app.configure(user);
  app.configure(room);
};
