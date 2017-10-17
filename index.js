module.exports = function processHealthRequest(req, res) {
  const result = {};

  try {
    result.uptime = process.uptime();
    result.memory = process.memoryUsage();
    result.isHealthy = true;
  } catch (e) {
    result.isHealthy = false;
    res.status(503);
  }

  res.json(result);
};
