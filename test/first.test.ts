import request from 'supertest';
import { app } from '../src/app';

const user = {
    username: 'TestName',
    age: 42,
    hobbies: []
};

const userForUpdate = {
    username: 'Lev',
    age: 36,
    hobbies: ['games']
};

describe('First test scenario', () => {
    it('Home page', async () => {
        const response = await request(app).get('/');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toEqual(404);
    });

    it('Empty users list', async () => {
        const response = await request(app).get('/api/users');

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual([]);
    });

    let userId: string;
    let userData: any;

    it('Create user', async () => {
        const response = await request(app)
            .post('/api/users')
            .send(user);
        expect(response.statusCode).toEqual(201);

        userId = response.body.id;
        userData = {
            id: userId,
            ...user
        };
        expect(response.body).toEqual(userData);
    });

    it('Get user by id', async () => {
        const response = await request(app)
            .get(`/api/users/${userId}`);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual(userData);
    });

    it('Update user', async () => {
        const response = await request(app)
            .put(`/api/users/${userId}`)
            .send(userForUpdate);
        expect(response.statusCode).toEqual(200);
        
        userData = {
            id: userId, 
            ...userForUpdate
        };
        expect(response.body).toEqual(userData);
    });

    it('Delete user', async () => {
        const response = await request(app)
            .delete(`/api/users/${userId}`);
        expect(response.statusCode).toEqual(204);
    });

    it('User deleted', async () => {
        const response = await request(app)
            .get(`/api/users/${userId}`);

        expect(response.statusCode).toEqual(404);
    });
});
