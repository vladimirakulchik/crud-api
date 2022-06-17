import { IncomingMessage, ServerResponse } from 'http';
import * as userController from '../controller/user/index';
import { NotFoundError } from '../error/NotFoundError';

export const runController = async (
    pathName: string, 
    method: string, 
    request: IncomingMessage,
    response: ServerResponse
): Promise<void> => {
    if ('api/users' === pathName && 'GET' === method) {
        await userController.getAll(request, response); // move request from all controllers
        return;
    }

    if ('api/users' === pathName && 'POST' === method) {
        await userController.create(request, response);
        return;
    }

    const isMatched: string[] | null = matchUserRoute(pathName);

    if (isMatched && 'GET' === method) {
        const id: string = isMatched[1];
        await userController.get(request, response, id);
        return;
    }

    throw new NotFoundError('Page not found.');
};

const matchUserRoute = (pathName: string): string[] | null => {
    return pathName.match(/^api\/users\/([^\/]+)$/);
};
