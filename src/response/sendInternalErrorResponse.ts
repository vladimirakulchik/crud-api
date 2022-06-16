import { ServerResponse } from 'http';

const STATUS_CODE: number = 500;
const ERROR_MESSAGE: string = 'An unexpected error occurred processing your request. Please, try again later.';

export const sendInternalErrorResponse = (response: ServerResponse): void => {
    response.writeHead(
        STATUS_CODE,
        { 
            'Content-Type': 'application/json'
        }
    );
    response.end(ERROR_MESSAGE);
};
