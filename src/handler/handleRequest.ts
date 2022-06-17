import { IncomingMessage, ServerResponse } from 'http';
import * as controllers from '../controller/index';
import { BadRequestError } from '../error/BadRequestError';
import { NotFoundError } from '../error/NotFoundError';
import { sendBadRequestResponse } from '../response/sendBadRequestResponse';
import { sendInternalErrorResponse } from '../response/sendInternalErrorResponse';
import { sendNotFoundResponse } from '../response/sendNotFoundResponse';

export const handleRequest = async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
    try {
        const pathName: string = getPathName(request);
        const method: string = request.method ?? '';
        console.log(method, pathName);

        await runController(pathName, method, request, response);
    } catch (error) {
        if (error instanceof NotFoundError) {
            sendNotFoundResponse(response, error.message);
            return;
        }

        if (error instanceof BadRequestError) {
            sendBadRequestResponse(response, error.message);
            return;
        }

        sendInternalErrorResponse(response);
    }
};

const runController = async (
    pathName: string, 
    method: string, 
    request: IncomingMessage,
    response: ServerResponse
): Promise<void> => {
    if ('api/users' === pathName && 'GET' === method) {
        await controllers.getAllUsers(request, response);
        return;
    }

    // get request body in controller

    throw new NotFoundError('Page not found.');
};

const getPathName = (request: IncomingMessage): string => {
    const url: URL = new URL(
        request.url ?? '',
        `http://${request.headers.host}`
    );

    return trimSlashes(url.pathname);
};

const trimSlashes = (str: string): string => {
    return str.replace(/^\/?|\/?$/g, '');
}
