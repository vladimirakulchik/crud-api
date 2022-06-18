import { ServerResponse } from 'http';
import { UserCollection } from '../../entity/UserCollection';
import { NotFoundError } from '../../error/NotFoundError';
import { validateUserId } from '../../helper/validateUserId';
import { sendResponse } from '../../response/sendResponse';

const STATUS_CODE: number = 204;

export const deleteUser = async (
    response: ServerResponse,
    id: string
): Promise<void> => {
    validateUserId(id);

    const users: UserCollection = UserCollection.getInstance();
    const userExist: boolean = await users.exist(id);

    if (!userExist) {
        throw new NotFoundError('User not found.');
    }

    await users.delete(id);

    sendResponse(response, STATUS_CODE);
};
