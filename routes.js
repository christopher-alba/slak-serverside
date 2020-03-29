const express = require('express')
const routes = express.Router()

// require external functions and data
const qAndA = require('./qAndA')
const utils = require('./utils')
const leaderboard = require('./leaderboard')

module.exports = routes

routes.get('/', (req, res) => {
    res.render('landing')
})

routes.get('/index', (req, res) => {
    let viewData = {
        leaderboard: leaderboard.board
    }
    res.render('index', viewData)
})

routes.post('/index', (req, res) => {
    utils.name = req.body.name
    res.redirect('/game')
})

routes.get('/game', (req, res) => {

    if(leaderboard.findPlayer( utils.name ) === undefined){
        leaderboard.addPlayerData()
    }
    else{
        leaderboard.updateLeaderboard( utils.name )
    }
    

    let viewData = {
        name: utils.name,
        question: qAndA.questions[utils.questionCount],
        leaderboard: leaderboard.board,
        answerA: qAndA.questions[utils.questionCount].a,
        answerB: qAndA.questions[utils.questionCount].b,
        answerC: qAndA.questions[utils.questionCount].c,
        answerD: qAndA.questions[utils.questionCount].d
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