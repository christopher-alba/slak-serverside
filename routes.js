const express = require('express')

const routes = express.Router()

module.exports = routes
let name = 'Player'
routes.get('/', (req, res) => {
    res.render('landing')
})

routes.get('/index', (req, res) => {
    res.render('index')
})

routes.post('/index', (req, res) => {
    name = req.body.name
    res.redirect('/game')
})

routes.get('/game', (req, res) => {
    let viewData = {
        name: name
    }
    res.render('game', viewData)
})

