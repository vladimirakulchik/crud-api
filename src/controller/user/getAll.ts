import { IncomingMessage, ServerResponse } from 'http';
import { sendResponse } from '../../response/sendResponse';

const STATUS_CODE_OK: number = 200;

export const getAll = async (
    request: IncomingMessage,
    response: ServerResponse
): Promise<void> => {
    // await, from DB
    const users: string[] = [];

    sendResponse(response, STATUS_CODE_OK, JSON.stringify(users));
};
