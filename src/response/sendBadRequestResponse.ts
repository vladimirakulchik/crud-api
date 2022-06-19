import { ServerResponse } from 'http';
import { BadRequestError } from '../error/BadRequestError';
import { sendResponse } from './sendResponse';

const STATUS_CODE: number = 400;

export const sendBadRequestResponse = (
    response: ServerResponse,
    error: BadRequestError
): void => {
    sendResponse(response, STATUS_CODE, error.message);
};
