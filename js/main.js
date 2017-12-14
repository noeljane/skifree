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
    -Make scoreboard start from zero or make more sense
    -make skier go faster
    -expand the board so that skier can go farther
    -hide form when you are playing game
    -fix the randomization for the obstacles
    -have obstacles be hidden when they go above the skier
        -or hide submission form and scoreboard
        -or float the scoreboard so obstacles go underneath

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
    {name: "Player 1",
    score: 0},
    {name: "Player 2",
    score: 0}
]

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

var obstacles = [{
    name: "tree",
    background:"forestgreen",
    x:0,
    y:0,
}, {
    name: "rock",
    background: "black",
    x:0,
    y:0, 
}, {
    name: "ogre",
    background: "grey",
    x:0,
    y:0,
}
]


//Interval Variables
var skierInterval
var obstacleInterval

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
    addPlayerToList()

}

function addPlayerToList (){
    var $newItem = $('<li>')
    $newItem.text($nameField.val())
    $list.append($newItem)
}

function createSkier (){
    $skier = $("<div class='slopeElement' id='skier'>")
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
    $('window').scroll()
}

//Event listener for the keyboard
$body.on('keydown',function (evt){
    if(evt.which === 37){
        $skier.css('left', '-=10px')
    } else if (evt.which === 39){
        $skier.css('left', '+=10px') 
    } else if (evt.which === 40){
        $skier.css('top', '+=10px')
        $('body').animate({
            scrollTop: $skier.offset().top
        }, 2000)
    }
})

//Function for Random Number
function randomInt(hi) {
    return Math.floor(Math.random()* hi)
}

//Function to create obstacle
function createObstacle (){
     //creates obstacle
        $newObstacle = $("<div class='slopeElement' id='obstacle'>")
        $newObstacle.css({
            "top": window.innerHeight,
            "left":  randomInt(window.innerWidth) + "px",  
            "background": "forestgreen",
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

    /* Pseudo code for creating loop
        
    
    */
     
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
        resetTheGame()
        playerLost()
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
        }
    } 
}
// Function to reset the game

function resetTheGame (){
        clearInterval(skierInterval)
        clearInterval(obstacleInterval)
        $slope.children().remove()  
    // get of the skier
    // get rid of the old obstacle
    //make a new skier
    //start the game again 

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
    console.log("Player lost!")
    players[game.currentPlayer].score = score
    $scoreBoard.text("You crashed! Your final score is " + score)
    var playerFinalScore = $('<li>')
    playerFinalScore.text(score)
    $list.append(playerFinalScore)
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
    $scoreBoard.text("Winner:" + winningPlayer.name)
}
//Event Listeners
$start.on("click", startSkiing)
$stop.on("click", resetTheGame)



// The Obstacles Hint from Zeke
// the obstacles should be in an array somewhere (probably as objects)

