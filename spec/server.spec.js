const http = require('http');

describe('get messages', () => {
    it('should return 200 ok', (done) => {
        http.get('http://localhost:3000/messages', res => {
            expect(res.statusCode).toEqual(200);
            done();
        })
    })

    it('should return a non-empty list', (done) => {
        http.get('http://localhost:3000/messages', res => {
            res.on('data', chunk => {
                expect(JSON.parse(chunk).length).toBeGreaterThan(0);
                done();
            })
        })
    })
})

describe('get messages from user', () => {
    it('should return 200 ok', (done) => {
        http.get('http://localhost:3000/messages/Aaditya', res => {
            expect(res.statusCode).toEqual(200);
            done();
        })
    })

    it('name should be Aaditya', (done) => {
        http.get('http://localhost:3000/messages/Aaditya', res => {
            res.on('data', chunk => {
                expect(JSON.parse(chunk)[0].name).toEqual('Aaditya')
                done();
            })
        })
    })
})