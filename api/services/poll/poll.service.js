// Initializes the `poll` service on path `/poll`
const createService = require('feathers-memory');
const hooks = require('./poll.hooks');

module.exports = function(app) {
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/poll', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('poll');

  service.hooks(hooks);

  service.publish(({ id }) => {
    return app.channel(id);
  });
};
