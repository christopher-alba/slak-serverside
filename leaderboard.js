let utils = require('./utils')

let board = [
    // include leaderboard info here (EMILY NEEDS TO BE 1ST!)
    {
      name:"Emily", 
      score: 25
    },
    {
      name: "Don",
      score: 19
    },
    {
      name: "JV",
      score: 18.5
    },
    {
      name: "JO$EPH",
      score: 16
    },
    {
      name:"Lane",
      score: 15
    },
]

module.exports = {
    board : board,
    arrangeBoard: arrangeBoard
}

function arrangeBoard() {
    
    board.sort(function (a, b) {
        return b.score - a.score
    })

    return board
}