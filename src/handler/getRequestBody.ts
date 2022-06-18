import { IncomingMessage } from 'http';
import { RequestBody } from './RequestBody';

export const getRequestBody = (request: IncomingMessage): Promise<RequestBody> => {
    return new Promise((resolve, reject) => {
        let body: string = '';

        request.setEncoding('utf8');

        request.on('data', (chunk: string) => {
            body += chunk;
        });

        request.on('end', () => {
            resolve(parseRequestBody(body));
        });
    });
}

const parseRequestBody = (body: string): RequestBody => {
    try {
        return JSON.parse(body);
    } catch (error) {
        return {};
    }
}
