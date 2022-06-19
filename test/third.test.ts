import request from 'supertest';
import { app } from '../src/app';

const user = {
    username: 'Nat',
    age: 42,
    hobbies: ['games', 'fan']
};

const userUntitled = {
    age: 36,
    hobbies: ['art']
};

describe('Third test scenario', () => {
    it('Non-existing endpoint', async () => {
        const response = await request(app).get('/some-non/existing/resource');

        expect(response.statusCode).toEqual(404);
    });

    it('Create user without name', async () => {
        const response = await request(app)
            .post('/api/users')
            .send(userUntitled);
        expect(response.statusCode).toEqual(400);
    });

    it('Get user by invalid id', async () => {
        const response = await request(app)
            .get('/api/users/uuid_here');

        expect(response.statusCode).toEqual(400);
    });

    it('Update user by invalid id', async () => {
        const response = await request(app)
            .put('/api/users/uuid_here')
            .send(user);
        expect(response.statusCode).toEqual(400);
    });

    it('Delete user', async () => {
        const response = await request(app)
            .delete('/api/users/uuid_here');
        expect(response.statusCode).toEqual(400);
    });

    it('Empty users list', async () => {
        const response = await request(app).get('/api/users');

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual([]);
    });
});
