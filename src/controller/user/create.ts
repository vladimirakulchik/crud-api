import { IncomingMessage, ServerResponse } from 'http';
import { BadRequestError } from '../../error/BadRequestError';
import { sendResponse } from '../../response/sendResponse';

const STATUS_CODE_CREATED: number = 201;

export const create = async (
    request: IncomingMessage,
    response: ServerResponse
): Promise<void> => {
    // get request body in controller, await
    const data = {};

    // validate
    if (false) {
        throw new BadRequestError('Invalid user data.');
    }

    // and create user
    const user = data;

    // save to DB, await

    sendResponse(response, STATUS_CODE_CREATED, JSON.stringify(user));
};
