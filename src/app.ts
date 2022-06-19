import { createServer, Server } from 'http';
import { handleRequest } from './handler/handleRequest';

export const app: Server  = createServer(handleRequest);
