const express = require('express')
const routes = express.Router()
// require external functions and data
const qAndA = require('./qAndA')
const utils = require('./utils')

module.exports = routes

routes.get('/', (req, res) => {
    res.render('landing')
})

routes.get('/index', (req, res) => {
    res.render('index')
})

routes.post('/index', (req, res) => {
    utils.name = req.body.name
    res.redirect('/game')
})

routes.get('/game', (req, res) => {
    let viewData = {
        name: utils.name,
        question: qAndA.questions[utils.questionCount]
    }
    res.render('game', viewData)
})

routes.post('/game', (req, res) => {
    let ans = req.body.answer
    let correctAns = qAndA.questions[utils.questionCount].answer
    if( utils.compareAnswer(ans, correctAns)) {
        utils.points++
    }

    if(utils.questionCount < qAndA.maxQuestionIndex){
        // utils.addQuestCount()
        utils.questionCount++
        res.redirect('/game')
    }
    else{
        
        res.redirect('/index')
        
    }    
})