import 'dotenv/config';
import { createServer } from 'http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!'
  }));
});

const port = process.env.PORT;

server.listen(port);
console.log(`Start server on port: ${port}`);
