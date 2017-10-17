# express-route-health

A route that can be mounted onto an express server that will return health information like:

```json
{
  "isHealthy": true,
  "memory": {
    "external": 9307,
    "heapTotal": 6291456,
    "heapUsed": 4691568,
    "rss": 25350144
  },
  "uptime": 123.45
}
```

Failed health checks return with the status code `503`.

## Usage

```js
import handleHealth from 'express-route-health';

const server = express();
server.get('/health', handleHealth);
```
