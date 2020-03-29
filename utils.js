let name = 'Player'
let questionCount = 0
let points = 0
let playerCounter = 0

module.exports = {
    name: name,
    questionCount: questionCount,
    points: points,
    playerCounter: playerCounter,
    compareAnswer: compareAnswer,
    addPoint: addPoint,
    addQuestCount: addQuestCount,
    changeName: changeName,
    resetStats: resetStats
}

function compareAnswer (ans, correctAns) {
    console.log('Answer:', ans);
    console.log('CorrectAns:', correctAns);
    
    if( ans === correctAns ){
        // console.log("answer is correct!");
        
        return true
    }

    return false
}

// these functions dont work with tests
function addPoint () {
    console.log("adding point");
    
    points++
    console.log("points:", points);
    
}

function addQuestCount () {
    console.log("increasing questCount");
    questionCount++
    console.log("qcount:", questionCount);
    
}

function changeName (newName) {
    name = newName
}

function resetStats () {
    points = 0
    questionCount = 0
    name = 'Player'
}