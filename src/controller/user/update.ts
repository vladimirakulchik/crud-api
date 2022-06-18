import { IncomingMessage, ServerResponse } from 'http';
import { BadRequestError } from '../../error/BadRequestError';
import { NotFoundError } from '../../error/NotFoundError';
import { sendResponse } from '../../response/sendResponse';

const STATUS_CODE_OK: number = 200;

export const update = async (
    request: IncomingMessage,
    response: ServerResponse,
    id: string
): Promise<void> => {
    // validate uuid
    if (false) {
        throw new BadRequestError('Invalid uuid.');
    }

    // await, from DB
    const user = {};

    // validate user
    if (false) {
        throw new NotFoundError('User not found.');
    }

    sendResponse(response, STATUS_CODE_OK, JSON.stringify(user));
};
