import { ServerResponse } from 'http';

const STATUS_CODE: number = 404;

export const sendNotFoundResponse = (response: ServerResponse, errorMessage: string): void => {
    response.writeHead(
        STATUS_CODE,
        { 
            'Content-Type': 'application/json'
        }
    );
    response.end(errorMessage);
};
