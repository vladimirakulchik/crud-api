import { IncomingMessage, ServerResponse } from 'http';
import { BadRequestError } from '../error/BadRequestError';
import { NotFoundError } from '../error/NotFoundError';
import { sendBadRequestResponse } from '../response/sendBadRequestResponse';
import { sendInternalErrorResponse } from '../response/sendInternalErrorResponse';
import { sendNotFoundResponse } from '../response/sendNotFoundResponse';
import { runController } from './runController';

export const handleRequest = async (
    request: IncomingMessage,
    response: ServerResponse
): Promise<void> => {
    try {
        const pathName: string = getPathName(request);
        const method: string = request.method ?? '';
        console.log(method, pathName);

        await runController(pathName, method, request, response);
    } catch (error: any) {
        if (error instanceof NotFoundError) {
            sendNotFoundResponse(response, error);
            return;
        }

        if (error instanceof BadRequestError) {
            sendBadRequestResponse(response, error);
            return;
        }

        sendInternalErrorResponse(response);
    }
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
