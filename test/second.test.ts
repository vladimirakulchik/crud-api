import request from 'supertest';
import { app } from '../src/app';

const user = {
    username: 'TestName',
    age: 42,
    hobbies: ['games']
};

describe('Second test scenario', () => {
    it('Empty users list', async () => {
        const response = await request(app).get('/api/users');

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual([]);
    });

    let userIds: string[] = [];
    let userData: any;

    it('Create user 1', async () => {
        const response = await request(app)
            .post('/api/users')
            .send(user);
        expect(response.statusCode).toEqual(201);

        userIds.push(response.body.id);
        userData = {
            id: response.body.id,
            ...user
        };
        expect(response.body).toEqual(userData);
    });

    it('Create user 2', async () => {
        const response = await request(app)
            .post('/api/users')
            .send(user);
        expect(response.statusCode).toEqual(201);

        userIds.push(response.body.id);
        userData = {
            id: response.body.id,
            ...user
        };
        expect(response.body).toEqual(userData);
    });

    it('Should be 2 users in the list', async () => {
        const response = await request(app).get('/api/users');

        expect(response.statusCode).toEqual(200);
        expect(response.body.length).toEqual(userIds.length);
    });

    it('Delete user 2', async () => {
        let id = userIds.pop();
        const response = await request(app)
            .delete(`/api/users/${id}`);
        expect(response.statusCode).toEqual(204);
    });

    it('Should be 1 user in the list', async () => {
        const response = await request(app).get('/api/users');

        expect(response.statusCode).toEqual(200);
        expect(response.body.length).toEqual(userIds.length);
    });

    it('Delete user 1', async () => {
        let id = userIds.pop();
        const response = await request(app)
            .delete(`/api/users/${id}`);
        expect(response.statusCode).toEqual(204);
    });

    it('Should be empty list', async () => {
        const response = await request(app).get('/api/users');

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual([]);
    });
});
