const request = require('supertest')
const {app} = require("../../index");

// A simple example test
describe('Testing all files CRUD api calls', () => {
    it('should return list of files', async () => {
        const res = await request(app).get("/files/")
        expect(res.statusCode).toEqual(200)
    })
})