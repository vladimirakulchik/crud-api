import { ServerResponse } from 'http';
import { User } from '../../entity/User';
import { UserCollection } from '../../entity/UserCollection';
import { NotFoundError } from '../../error/NotFoundError';
import { validateUserId } from '../../helper/validateUserId';
import { sendResponse } from '../../response/sendResponse';

const STATUS_CODE_OK: number = 200;

export const get = async (
    response: ServerResponse,
    id: string
): Promise<void> => {
    validateUserId(id);

    const users: UserCollection = UserCollection.getInstance();
    const user: User | undefined = await users.findById(id);

    if (!user) {
        throw new NotFoundError('User not found.');
    }

    sendResponse(response, STATUS_CODE_OK, user);
};
