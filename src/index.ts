import 'dotenv/config';
import { app } from './app';

const port = process.env.PORT || 8080;

app.listen(port);
console.log(`Start server on port: ${port}`);
