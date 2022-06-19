import { ServerResponse } from 'http';

const CONTENT_JSON: string = 'application/json';

export const sendResponse = (
    response: ServerResponse,
    code: number,
    data?: any
): void => {
    response.writeHead(
        code,
        { 
            'Content-Type': CONTENT_JSON
        }
    );
    response.end(JSON.stringify(data));
};
