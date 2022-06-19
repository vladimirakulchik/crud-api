import { validate as uuidValidate, version as uuidVersion } from 'uuid';
import { BadRequestError } from '../error/BadRequestError';

const UUID_VERSION = 4;

export const validateUserId = (id: string): void => {
    if (!isUserIdValid(id)) {
        throw new BadRequestError('Invalid user uuid.');
    }
};

const isUserIdValid = (id: string): boolean => {
    return uuidValidate(id) && uuidVersion(id) === UUID_VERSION;
};
