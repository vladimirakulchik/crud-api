import { v4 as generateId } from 'uuid';
import { ServerResponse } from 'http';
import { User } from '../../entity/User';
import { RequestBody } from '../../handler/RequestBody';
import { createUserFromRequest } from '../../helper/createUserFromRequest';
import { sendResponse } from '../../response/sendResponse';
import { UserCollection } from '../../entity/UserCollection';

const STATUS_CODE_CREATED: number = 201;

export const create = async (
    response: ServerResponse,
    body: RequestBody
): Promise<void> => {
    const id = generateId();
    const user: User = createUserFromRequest(body, id);

    const users: UserCollection = UserCollection.getInstance();
    await users.add(user);

    sendResponse(response, STATUS_CODE_CREATED, user);
};
