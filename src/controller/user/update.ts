import { ServerResponse } from 'http';
import { User } from '../../entity/User';
import { UserCollection } from '../../entity/UserCollection';
import { NotFoundError } from '../../error/NotFoundError';
import { RequestBody } from '../../handler/RequestBody';
import { createUserFromRequest } from '../../helper/createUserFromRequest';
import { validateUserId } from '../../helper/validateUserId';
import { sendResponse } from '../../response/sendResponse';

const STATUS_CODE_OK: number = 200;

export const update = async (
    response: ServerResponse,
    id: string,
    body: RequestBody
): Promise<void> => {
    validateUserId(id);

    const users: UserCollection = UserCollection.getInstance();
    const userExist: boolean = await users.exist(id);

    if (!userExist) {
        throw new NotFoundError('User not found.');
    }

    const newUser: User = createUserFromRequest(body, id);
    users.update(newUser);

    sendResponse(response, STATUS_CODE_OK, JSON.stringify(newUser));
};
