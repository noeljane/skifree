/*
Day 4 
-Game does not reset automatically x
-Need to set up more obstacles
-set up scroll???? or just have objects moving?
    -if no scroll, rebuild scoring
- Have a way to refresh the scoreboard/players (?)
    -if not, get rid of form submission
- Add a button to play again    
-Clean up game
-Make it look pretty


Punch List: 
    -Make scoreboard start from zero or make more sense x
    -make skier go faster n/a
    -expand the board so that skier can go farther n/a
    -hide form when you are playing game
    -fix the randomization for the obstacles x
    -have obstacles be hidden when they go above the skier
        -or hide submission form and scoreboard x
        -or float the scoreboard so obstacles go underneath
    -get rid of players in the array and add explicit instructions

    -

*/


// Variables
// ////////////////////////////////////////////////////////////////////

var $body = $('body')
var $slope = $('#slope')
var $topStuff = $('#topStuff')

//Buttons
var $turnRight = $('#turnRight')
var $turnLeft = $('#turnLeft')
var $stop = $('#stop')

//Variable for start button
var $start = $('#start')

//ScoreBoard
var $scoreBoard = $('#scoreboard')

//Global Variables
var players = []

var game = {
    currentPlayer: 0
}

var $skier
var $newObstacle
var obstacleX
var obstacleY
var score

var skier = {
    x: 0,
    y: 0,
    updateSpeed: 500,
}




//Interval Variables
var skierInterval
var obstacleInterval
var obstacleIntervals = []


//Form Submission
var $signupForm = $('#signup-form')
var $nameField = $('#name')
var $list = $('#playerList')

$signupForm.on('submit',createPlayer)



//Functions
//////////////////////////////////////////////////////////////////////////

function createPlayer (evt){
    evt.preventDefault()
    //make a new player object and add it to the array
    var newPlayer = {
        name: $nameField.val(),
        score: 0
    }
    players.push(newPlayer)
    var $newName = $('<li>')
    $newName.text(newPlayer.name)
    $list.append($newName)
}

// function addPlayerToList (name){
//     var $newItem = $('<li>')
//     $list.append(players)
// }

function createSkier (){
    $skier = $("<div class='slopeElement' id='skier'>")
    $skier.innerHTML = '<img src="skier\.png">'
    $slope.append($skier)
    $skier.css('left', window.innerWidth/2 + 'px') 
    $skier.css('top', window.innerHeight/2 + 'px')
    skier.x = parseInt($skier.position().left)
    skier.y = parseInt($skier.position().top)

}

//Function to start skiing
function startSkiing () {
    if(players.length === 0){
        players.push({
        name: "Player 1",
        score: 0
    })
        players.push({
        name: "Player 2",
        score: 0
        })
    }
    $topStuff.hide()
    createSkier()
    score = 0
    console.log("You clicked start! Gnarly, bro!")
    skierInterval = setInterval(function(){
        //$skier.css("top", "+=5px")
        skier.x = parseInt($skier.position().left)
        skier.y = parseInt($skier.position().top)
        score += 5
        //display score
        displayScore()
    },skier.updateSpeed)
    generateObstacles()
    $('window').scroll()
}

function generateObstacles() {
    generateObstacleInterval = setInterval(createObstacle, 3000)
}

//Event listener for the keyboard
$body.on('keydown',function (evt){
    if(evt.which === 37){
        $skier.css('left', '-=10px')
    } else if (evt.which === 39){
        $skier.css('left', '+=10px') 
    }
})

//Function for Random Number
function randomInt(hi) {
    return Math.floor(Math.random()* hi)
}

//Function to create obstacle
function createObstacle (){
     //creates obstacle
        var $newObstacle = $("<div>").addClass('slopeElement')
        $newObstacle.css({
            "top": window.innerHeight,
            "left":  randomInt(window.innerWidth) + "px",  
        })
        $slope.append($newObstacle)
        obstacleIntervals.push(setInterval(function(){
            $newObstacle.css('top','-=5px')
            collisionCheck($newObstacle)
            if (parseInt($newObstacle.css("top")) < 0){
                $newObstacle.css("top","800px")
                //calculate a new x for the obstacle
                $newObstacle.css("left", randomInt(window.innerWidth))
            }
        }, 50))
} 




//Function to check for collision
function collisionCheck(obstacle){
    skier.x = parseInt($skier.position().left)
    skier.y = parseInt($skier.position().top)
    obstacleX = parseInt(obstacle.position().left)
    obstacleY = parseInt(obstacle.position().top)
    skierWidth = 50
    obstacleWidth = 50
    skierHeight = 10
    obstacleHeight = 10

    if((skier.x < obstacleX + obstacleWidth) && (skier.x + skierWidth > obstacleX) && 
    (skier.y < obstacleY + obstacleHeight) && 
    (skierHeight + skier.y > obstacleY)){
        $skier.toggle("explode")
        console.log("Wipeout!")
        resetTheGame()
        playerLost()
        
        obstacleIntervals.forEach(function(intervalId) {
            clearInterval(intervalId)
        })
        obstacleIntervals = []

        // 2 possibilities
            // 1. person who just finished the game is NOT the last player
                    // if not, add 1 to current player and set score to zero
            // 2. person who finished the game is the last player
                    // if last player, then declare scores and compare a winner
        if (game.currentPlayer < (players.length -1)) {
            game.currentPlayer++
            score = 0 
        } else {
            compareScores()
            $topStuff.show()
            $('#instructions').hide()
        }
    } 
}
// Function to reset the game

function resetTheGame (){
        clearInterval(skierInterval)
        clearInterval(obstacleInterval)
        clearInterval(generateObstacleInterval)
        $slope.children().remove()  
    // get of the skier
    // get rid of the old obstacle
    //make a new skier
    //start the game again 

}

// Function to score the game 
function displayScore (){
    skier.y = parseInt($skier.position().top)
    $scoreBoard.text("Distance traveled: " + score)

}

// Function to stop the game when there is a crash
function playerLost (){
    skier.y = parseInt($skier.position().top)
    console.log("Player lost!")
    players[game.currentPlayer].score = score
    $scoreBoard.text("You crashed! Your final score is " + score)
    $list.children().remove()
    players.forEach(function(value){
        var playerFinalScore = $('<li>')
        playerFinalScore.text(value.name + " " + value.score)
        $list.append(playerFinalScore)
    })
   
}

// Function to compare scores
var $listItem = $('li')
function compareScores (){
    //find the highest score in the players array. 
    // make an announcement where we say the name of the player with highest score wins
    var winningPlayer = players.reduce(function(prev, current) {
        return (prev.score > current.score) ? prev : current  
    })
    console.log(winningPlayer)
    console.log(winningPlayer.name)
    $scoreBoard.text("Winner:  " + winningPlayer.name)
}

//function for new game
    function newGame (){
        resetTheGame()
        players = []
    }
//Event Listeners
$start.on("click", startSkiing)
$stop.on("click", resetTheGame)

/*
//Check List for LAST NIGHT
    -ReadME
    -GH Pages
*/