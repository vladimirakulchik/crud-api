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
    const userId: string = matchedData ? matchedData[1] : '';

    // path: api/users/{userId}
    if (matchedData) {
        if ('GET' === method) {
            await userController.get(response, userId);
            return;
        }

        if ('PUT' === method) {
            await userController.update(response, userId, body);
            return;
        }

        if ('DELETE' === method) {
            await userController.deleteUser(response, userId);
            return;
        }
    }

    throw new NotFoundError('Page not found.');
};

const matchUserRoute = (pathName: string): string[] | null => {
    return pathName.match(/^api\/users\/([^\/]+)$/);
};
