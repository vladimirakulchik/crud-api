import { ServerResponse } from 'http';

export const sendResponse = (
    response: ServerResponse,
    code: number,
    data: string
): void => {
    response.writeHead(
        code,
        { 
            'Content-Type': 'application/json'
        }
    );
    response.end(data);
};
