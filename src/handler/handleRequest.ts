import { IncomingMessage, ServerResponse } from 'http';
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

        // choose controller (aka router)
        // if nothing match -> throw new NotFoundError('Page not found.');

        // get request body in controller
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

    // response.writeHead(200, { 'Content-Type': 'application/json' });
    // response.end(JSON.stringify({
    //     data: 'Should be data here.'
    // }));
};

const getPathName = (request: IncomingMessage): string => {
    const url: URL = new URL(
        request.url ?? '',
        `http://${request.headers.host}`
    );

    return trimSlashes(url.pathname);
};

const trimSlashes = (str: string): string => {
    return str.replace(/^\/*|\/*$/g, '');
}
