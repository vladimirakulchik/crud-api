import cluster, { Worker } from 'cluster';
import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { cpus } from 'os';
import process from 'process';
import 'dotenv/config';
import { UserCollection } from './entity/UserCollection';
import { handleRequest } from './handler/handleRequest';

const users: UserCollection = UserCollection.getInstance();

const createWorkers = () => {
    const workersCount = cpus().length;

    for (let i: number = 0; i < workersCount; i++) {
        let worker: Worker = cluster.fork();

        // Initialize DB on each worker.
        worker.send(users.getState());

        // Notify all workers about changes in DB.
        worker.on('message', notifyWorkers);
    }
}

const notifyWorkers = (state: string) => {
    for (const id in cluster.workers) {
        let worker: Worker | undefined = cluster.workers[id];

        if (worker) {
            worker.send(state);
        }
    }
}

const executeRequest = async (
    request: IncomingMessage,
    response: ServerResponse
): Promise<void> => {
    await handleRequest(request, response);
    console.log(`Process ${process.pid} handled request`);

    if (process.send) {
        process.send(users.getState());
    }
}

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    createWorkers();

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {
    const port = process.env.PORT || 8080;
    const app: Server = createServer(executeRequest);
    app.listen(port);

    process.on('message', (state: string) => {
        users.updateState(state);
    });

    console.log(`Worker ${process.pid} started on port ${port}`);
}
