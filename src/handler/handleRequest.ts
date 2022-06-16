import { IncomingMessage, ServerResponse } from 'http';
import { BadRequestError } from '../error/BadRequest';
import { NotFoundError } from '../error/NotFound';
import { sendNotFoundResponse } from '../response/sendNotFoundResponse';

export const handleRequest = async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
    try {
        const pathName: string = getPathName(request);
        console.log(request.method, pathName);

        throw new NotFoundError('Page not found.');
    } catch (error) {
        if (error instanceof NotFoundError) {
            sendNotFoundResponse(response, error.message);
            return;
        }

        if (error instanceof BadRequestError) {
            sendNotFoundResponse(response, error.message);
            return;
        }
    }





    // response.writeHead(200, { 'Content-Type': 'application/json' });
    // response.end(JSON.stringify({
    //     data: 'Hello from Request handler!'
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

// const parsedData = JSON.parse(rawData);


