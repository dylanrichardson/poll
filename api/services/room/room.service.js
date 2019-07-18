// Initializes the `room` service on path `/room`
const createService = require('feathers-memory');
const hooks = require('./room.hooks');

module.exports = function(app) {
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/room', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('room');

  service.hooks(hooks);
};
