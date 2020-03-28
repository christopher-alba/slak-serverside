const server = require('../server')
const request = require('supertest')
const cheerio = require('cheerio')
const utils = require('../utils')

test('Test if namechange is working after post request to index', done => {
    request(server)
        .post('/index')
        .send({'name': 'Christopher'})
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(302)

            let actual = utils.name
            let expected = 'Christopher'

            expect(actual).toBe(expected)

            done()
        })
})

test('Test if question count is increasing after post request', done => {
    utils.questionCount = 0
    utils.points = 0

    request(server)
        .post('/game')
        .send({'answer': 'Javascript Object Notation'})
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            expect(err).toBeNull()

            expect(res.status).toBe(302)

            // test question Counter 
            let actual = utils.questionCount
            let expected = 1

            expect(actual).toBe(expected)
            done()
        })
})

test('Test if points count is increasing after post request recieves correct answer', done => {
    utils.questionCount = 0
    utils.points = 0
    
    request(server)
    .post('/game')
    .send({'answer': 'Javascript Object Notation'})
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .end((err, res) => {
        expect(err).toBeNull()

        expect(res.status).toBe(302)

        // test question Counter 
        let actual = utils.points
        let expected = 1

        expect(actual).toBe(expected)
        done()
    })
})

test('Test if points count is the same after post request recieves wrong answer', done => {
    utils.questionCount = 0
    utils.points = 0
    
    request(server)
    .post('/game')
    .send({'answer': 'wrong answer'})
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .end((err, res) => {
        expect(err).toBeNull()

        expect(res.status).toBe(302)

        // test question Counter 
        let actual = utils.points
        let expected = 0

        expect(actual).toBe(expected)
        done()
    })
})

test('Question count does not increase after post request on the last question', done => {
    utils.questionCount = 19
    utils.points = 0

    request(server)
        .post('/game')
        .send({'answer': 'random'})
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(302)

            let actual = utils.questionCount
            let expected = 19
            expect(actual).toBe(expected)

            done()
        })
})