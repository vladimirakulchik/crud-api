import { User } from '../entity/User';
import { BadRequestError } from '../error/BadRequestError';
import { RequestBody } from '../handler/RequestBody';

export const createUserFromRequest = (body: RequestBody, id: string): User => {
    if (isEmptyBody(body)) {
        throw new BadRequestError('Invalid request body.');
    }

    if (typeof body.username !== 'string') {
        throw new BadRequestError('Invalid user name.');
    }

    if (typeof body.age !== 'number' || body.age < 0) {
        throw new BadRequestError('Invalid user age.');
    }

    if (!body.hobbies || !isArrayOfStrings(body.hobbies)) {
        throw new BadRequestError('Invalid user hobbies.');
    }

    return new User(body.username, body.age, body.hobbies, id);
};

const isEmptyBody = (body: RequestBody) => {
    return Object.keys(body).length === 0;
};

const isArrayOfStrings = (value: any): boolean => {
    return Array.isArray(value) 
        && value.every(
            item => typeof item === 'string'
        );
};
