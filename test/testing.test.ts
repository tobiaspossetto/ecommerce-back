import {app, server} from '../src/index';
const supertest = require('supertest');
const api = supertest(app)

test('/ expected 200', async() =>{
    await api
    .get('/')
    .expect(200)
    //.expect('Content-Type', /json/)

})



test('/ expected 400', async() =>{
    await api
    .post('/create-user')
    .send({
        "name": "test",
        "email": "asdasdasdad ",
        "password": "test"
    })
    .expect(400)
    //.expect('Content-Type', /json/)

})
    //.expect('Content-Type', /json/)



afterAll(() => {
    server.close();
})