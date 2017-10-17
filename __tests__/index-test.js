const handleHealth = require('../');

const originalProcess = global.process;

it('returns health information', () => {
  global.process = Object.assign({}, global.process, {
    uptime: () => 123.45,
    memoryUsage: () => ({
      rss: 25350144,
      heapTotal: 6291456,
      heapUsed: 4691568,
      external: 9307
    })
  });

  let response;
  const res = {
    json(json) {
      response = json;
    }
  };

  handleHealth(null, res);
  expect(response).toEqual({
    isHealthy: true,
    memory: {
      external: 9307,
      heapTotal: 6291456,
      heapUsed: 4691568,
      rss: 25350144
    },
    uptime: 123.45
  });

  global.process = originalProcess;
});

it('returns a 503 status code when the check fails', () => {
  global.process = Object.assign({}, global.process, {
    uptime: () => {
      throw new Error();
    },
    memoryUsage: () => {
      throw new Error();
    }
  });

  let response, status;
  const res = {
    status(_status) {
      status = _status;
    },
    json(json) {
      response = json;
    }
  };

  handleHealth(null, res);
  expect(status).toBe(503);
  expect(response).toEqual({isHealthy: false});

  global.process = originalProcess;
});
