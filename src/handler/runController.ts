import { IncomingMessage, ServerResponse } from 'http';
import * as userController from '../controller/user/index';
import { NotFoundError } from '../error/NotFoundError';
import { getRequestBody } from './getRequestBody';
import { RequestBody } from './RequestBody';

export const runController = async (
    pathName: string, 
    method: string, 
    request: IncomingMessage,
    response: ServerResponse
): Promise<void> => {
    const body: RequestBody = await getRequestBody(request);

    // remove request from all controllers, use id and body

    if ('api/users' === pathName) {
        if ('GET' === method) {
            await userController.getAll(response);
            return;
        }

        if ('POST' === method) {
            await userController.create(response, body);
            return;
        }
    }

    const matchedData: string[] | null = matchUserRoute(pathName);
    const id: string = matchedData ? matchedData[1] : '';

    if (matchedData && 'GET' === method) {
        await userController.get(request, response, id);
        return;
    }

    if (matchedData && 'PUT' === method) {
        await userController.update(request, response, id);
        return;
    }

    if (matchedData && 'DELETE' === method) {
        await userController.deleteUser(request, response, id);
        return;
    }

    throw new NotFoundError('Page not found.');
};

const matchUserRoute = (pathName: string): string[] | null => {
    return pathName.match(/^api\/users\/([^\/]+)$/);
};
