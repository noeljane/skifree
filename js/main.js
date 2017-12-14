/*
Day 3
1. Add Scoreboard x
2. Add player 2 capacity
    -create form for Player 1 entry x
    -make the game stop when you crash x
    -change the player when you crash
    -prompt form for Player 2 entry
    -make the game stop when player 2 crashes 
    -compare scores between player 1 and player 2
    -declare a winner
    -add a button to play again
3. Make the window scroll as you play or just keep the player still  
4. Make more obstacles
5. Clean up code whereever possible and make it more programmatic
    -see Punch List
6. Make it possible to move skier with the left and right keys x
7. Make it beautiful  
8. Add an ogre??? 

Punch List: 
    -Make scoreboard start from zero or make more sense
    -make skier go faster
    -expand the board so that skier can go farther
    -hide form when you are playing game
    -
*/


// Variables
// ////////////////////////////////////////////////////////////////////

var $body = $('body')
var $slope = $('#slope')

//Buttons
var $turnRight = $('#turnRight')
var $turnLeft = $('#turnLeft')
var $stop = $('#stop')

//Variable for start button
var $start = $('#start')

//ScoreBoard
var $scoreBoard = $('#scoreboard')

//Global Variables
var players = [
    {name: "Noel",
    score: 0},
    {name: "Chuck",
    score: 0}
]
var game = {
    currentPlayer: players[0]
}

var $skier
var $newObstacle
var obstacleX
var obstacleY
var score

var skier = {
    x: 0,
    y: 0,
    updateSpeed: 500
}

var obstacle = {
    x:0,
    y:0,
    updateSpeed:100
}
//Interval Variables
var skierInterval
var obstacleInterval

//Variables to create multiple speeds and obstacles
var obstacleNames = ["tree","rock","ogre"]
var colors = ["green","black","grey"]
var speeds = [1000, 500, 100]

//Form Submission
var $signupForm = $('#signup-form')
var $nameField = $('#name')
var $list = $('#playerList')

$signupForm.on('submit',createPlayer)



//Functions
//////////////////////////////////////////////////////////////////////////

function createPlayer (evt){
    evt.preventDefault()
    var $newItem = $('<li>')
    $newItem.text($nameField.val())
    $list.append($newItem)
}

function createSkier (){
    $skier = $("<div id='skier'>")
    $slope.append($skier)
    $skier.css('left', window.innerWidth/2 + 'px') 
    skier.x = parseInt($skier.position().left)
    skier.y = parseInt($skier.position().top)

}



//Function to start skiing
function startSkiing () {
    createSkier()
    console.log("You clicked start! Gnarly, bro!")
    skierInterval = setInterval(function(){
        $skier.css("top", "+=5px")
        skier.x = parseInt($skier.position().left)
        skier.y = parseInt($skier.position().top)
        //display score
        displayScore()
    },skier.updateSpeed)
    createObstacle()
}

//Event listener for the keyboard
$body.on('keydown',function (evt){
    console.log(evt)
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
     $newObstacle = $("<div id='obstacle'>")
     $newObstacle.css({
         "top": window.innerHeight,
         "left":  randomInt(window.innerWidth) + "px",  
     })
     $slope.append($newObstacle)
     obstacleInterval = setInterval(function(){
         $newObstacle.css('top','-=5px')
         collisionCheck()
         if (parseInt($newObstacle.css("top")) < 0){
             $newObstacle.css("top","800px")
             //calculate a new x for the obstacle
             $newObstacle.css("left",randomInt(window.innerWidth + "px"))
         }
     }, 50)
} 



//Function to check for collision
function collisionCheck (){
    skier.x = parseInt($skier.position().left)
    skier.y = parseInt($skier.position().top)
    obstacleX = parseInt($newObstacle.position().left)
    obstacleY = parseInt($newObstacle.position().top)
    skierWidth = 10
    obstacleWidth = 10
    skierHeight = 10
    obstacleHeight = 10

    if((skier.x < obstacleX + obstacleWidth) && (skier.x + skierWidth > obstacleX) && 
    (skier.y < obstacleY + obstacleHeight) && 
    (skierHeight + skier.y > obstacleY)){
        $skier.toggle("explode")
        console.log("Wipeout!")
        stopTheGame()
        playerLost()
        compareScores()
    } 
}

// Function to clear intervals
function stopTheGame (){
    clearInterval(skierInterval)
    clearInterval(obstacleInterval)
}

// Function to score the game 
function displayScore (){
    skier.y = parseInt($skier.position().top)
    score = skier.y
    $scoreBoard.text("Distance traveled: " + score)

}

// Function to stop the game when there is a crash
function playerLost (){
    skier.y = parseInt($skier.position().top)
    score = skier.y
    console.log("Player lost!")
    $scoreBoard.text("You crashed! Your final score is " + score)
    var playerFinalScore = $('<li>')
    playerFinalScore.text(score)
    $list.append(playerFinalScore)
}

//Function to compare scores
var $listItem = $('li')
function compareScores (){
    player1score = parseInt($listItem.eq(1).text())
    player2score = parseInt($listItem.eq(3).text())
    if(player1score > player2score) {
        console.log("Player 1 wins.")
    } else if (player2score > player1score){
        console.log ("Player 2 wins!")
    } else {
        console.log("Player 2 needs to play still")
        game.currentPlayer = players[1]
    }
    
}

//Event Listeners
$start.on("click", startSkiing)
$stop.on("click", stopTheGame)

// Player 1 plays 
// function playerPlays (){
//     createPlayer(evt)
//     createSkier()
//     startSkiing()
//     collisionCheck()
//     console.log("Play complete")
// }

// 




/* 
Logic of the Game: 

Player 1 puts in name x
Player 1 plays x
Player 1 crashes x
Player 1 gets score x

Prompt Player 2 to play Game
Player 2 plays
Player 2 crashes 
Player 2 gets score

Compare player 1 score to player 2 score
Declare winner

Reset the whole game
*/

// Questions for Teacher
    // how to tell the game that there can only be 2 players and compare scores
    // how to use arrow keys