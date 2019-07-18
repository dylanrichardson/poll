const assert = require('assert');
const app = require('../../api/app');

describe("'room' service", () => {
  it('registered the service', () => {
    const service = app.service('room');

    assert.ok(service, 'Registered the service');
  });
});
