import 'dotenv/config';
import { createServer } from 'http';
import { handleRequest } from './handler/handleRequest';

const server = createServer(handleRequest);
const port = process.env.PORT;

server.listen(port);
console.log(`Start server on port: ${port}`);
