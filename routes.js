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
    utils.playerCounter++
    utils.name = 'Player' + utils.playerCounter
    utils.points = 0
    utils.questionCount = 0
    res.render('index', viewData)
})

routes.post('/index', (req, res) => {
    if(req.body.name.length > 0){
        utils.name = req.body.name
        
    }
    res.redirect('/game')
})

routes.get('/game', (req, res) => {    

    let viewData = {
        name: utils.name,
        score: utils.points,
        question: qAndA.questions[utils.questionCount],
        leaderboard: leaderboard.board
    }

    res.render('game', viewData)
})

routes.post('/game', (req, res) => {
    let ans = req.body.answer
    console.log('req.body.answer log: ' + ans)
    let correctAns = qAndA.questions[utils.questionCount].answer
    console.log("testing 1");
    
    if( utils.compareAnswer(ans, correctAns)) {
        utils.points++
        console.log(utils.points);
        
    }

    if(utils.questionCount < qAndA.maxQuestionIndex){
        // utils.addQuestCount()
        utils.questionCount++
        res.redirect('/game')
    }
    else{

        leaderboard.addPlayerData()
        leaderboard.updateLeaderboard()
        res.redirect('/index')

        
    }    
})