import { ServerResponse } from 'http';
import { sendResponse } from './sendResponse';

const STATUS_CODE: number = 500;
const ERROR_MESSAGE: string = 'An unexpected error occurred processing your request. Please, try again later.';

export const sendInternalErrorResponse = (response: ServerResponse): void => {
    sendResponse(response, STATUS_CODE, ERROR_MESSAGE);
};
