import { ServerResponse } from 'http';
import { User } from '../../entity/User';
import { UserCollection } from '../../entity/UserCollection';
import { sendResponse } from '../../response/sendResponse';

const STATUS_CODE_OK: number = 200;

export const getAll = async (response: ServerResponse): Promise<void> => {
    const users: UserCollection = UserCollection.getInstance();
    const allUsers: User[] = await users.getAll();

    sendResponse(response, STATUS_CODE_OK, allUsers);
};
