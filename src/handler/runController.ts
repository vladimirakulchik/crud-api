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
        await userController.getAll(request, response);
        return;
    }

    if ('api/users' === pathName && 'POST' === method) {
        await userController.create(request, response);
        return;
    }

    throw new NotFoundError('Page not found.');
};
