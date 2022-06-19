import { ServerResponse } from 'http';
import { NotFoundError } from '../error/NotFoundError';
import { sendResponse } from './sendResponse';

const STATUS_CODE: number = 404;

export const sendNotFoundResponse = (
    response: ServerResponse,
    error: NotFoundError
): void => {
    sendResponse(response, STATUS_CODE, error.message);
};
