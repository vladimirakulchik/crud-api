import request from 'supertest';
import { app } from '../src/app';

describe('First test scenario', () => {
    it('Home page', async () => {
        const response = await request(app).get('/');

        expect(response.statusCode).toEqual(404);
    });

    it('Empty users list', async () => {
        const response = await request(app).get('/api/users');

        expect(response.statusCode).toEqual(200);
    });

});
