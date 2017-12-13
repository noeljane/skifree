/*

Steps to get this work done: 

Day 1 
1. Link JS and CSS files x
2. Create an obstacle using a variable x
3. Create a constructor function n/a
4. Think about how the obstacle is moving across the screen x
5. Move the skier and obstacle lower down x
6. Is it possible to set it up vertically? yes x
7. Make the skier x
8. Make the skier move x

//Zeke notes: 
//Make sure that we can "get" the x & y coordinate of each obstacle because that information will help us figure out collision
//Need to get the x coordinate of the skier
//To get the y value, I need to find out what "top" is for each obstacle (top is the y value for each obstacle)
//To get the x value, I need the "left" is for each obstacle
// On each run of the interval function, we should check to see if the obstacle is colliding with the skier

Day 2
1. Make the obstacles come automatically x 
2. Set up what a collision means x
    -make scoreboard
    -establish boundary of collision 
        -set up y coordinates x
        -set up x cooridnates 
3. Make the obstacles appear from different points on the screen. x 
4. Make the skier jump different directions to avoid collision. x

Day 2 Afternoon: 
1. Figure out how to check x coordinates x
2. Clean up code
    -make more things happen programmatically
    -make code more DRY and easy to read

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
3. Make the window scroll as you play 
4. Make more obstacles
5. Clean up code whereever possible and make it more programmatic
    -see Punch List
6. Make it possible to move skier with the left and right keys
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
var $skier
var $newObstacle
var obstacleX
var obstacleY
var skierX 
var skierY
var score

//Interval Variables
var skierInterval
var sbstacleInterval

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
    skierX = parseInt($skier.position().left)
    skierY = parseInt($skier.position().top)

}



//Function to start skiing
function startSkiing () {
    createSkier()
    console.log("You clicked start! Gnarly, bro!")
    skierInterval = setInterval(function(){
        console.log("Rip it!")
        $skier.css("top", "+=5px")
        skierX = parseInt($skier.position().left)
        skierY = parseInt($skier.position().top)
        console.log(skierX)
        console.log(skierY)
        //display score
        displayScore()
    },500)
    createObstacle()
}

//Function to make my skier move right
$turnRight.on('click', function (){
    console.log("Sick carves, brah!")
    $skier.css('left', '+=10px') 
    console.log($skier.css('left'))
})

// Function to make my skier move left
$turnLeft.on('click', function (){
    console.log("A la izquierda broseph!")
    $skier.css('left', '-=10px')
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
         "position": "absolute",
         "top": window.innerHeight,
         "color": "forestgreen",
         "border": "2px solid black",
         "width": "10px",
         "height": "10px",
         "left":  randomInt(window.innerWidth) + "px",
         "display": "inline-block",    
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
     }, 1000)
} 



//Function to check for collision
function collisionCheck (){
    skierX = parseInt($skier.position().left)
    skierY = parseInt($skier.position().top)
    obstacleX = parseInt($newObstacle.position().left)
    obstacleY = parseInt($newObstacle.position().top)
    skierWidth = 10
    obstacleWidth = 10
    skierHeight = 10
    obstacleHeight = 10

    if((skierX < obstacleX + obstacleWidth) && (skierX + skierWidth > obstacleX) && 
    (skierY < obstacleY + obstacleHeight) && 
    (skierHeight + skierY > obstacleY)){
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
    skierY = parseInt($skier.position().top)
    score = skierY
    $scoreBoard.text("Distance traveled: " + score)

}

// Function to stop the game when there is a crash
function playerLost (){
    skierY = parseInt($skier.position().top)
    score = skierY
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
        console.log("You fucked something up or Player 2 needs to play still")
    }
    
}

//Event Listeners
$start.on("click", startSkiing)
$stop.on("click", stopTheGame)

// Player 1 plays 
function playerPlays (){
    createPlayer(evt)
    createSkier()
    startSkiing()
    collisionCheck()
    console.log("Play complete")
}

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