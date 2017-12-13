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
1. Figure out how to check x coordinates 
2. Clean up code
    -make more things happen programmatically
    -make code more DRY and easy to read

*/

// Variables
// ////////////////////////////////////////////////////////////////////
//Variables for 
var $body = $('body')
var $slope = $('#slope')

//Buttons
var $turnRight = $('#turnRight')
var $turnLeft = $('#turnLeft')
var $stop = $('#stop')
var $startObstacles = $('#obstacles begin')

//Global Variables
var $skier
var $newObstacle
var obstacleX
var obstacleY
var skierX 
var skierY

//Interval Variables
var skierInterval
var sbstacleInterval


//Variables to create multiple speeds and obstacles
var obstacleNames = ["tree","rock","ogre"]
var colors = ["green","black","grey"]
var speeds = [1000, 500, 100]

//Variable for start button
var $start = $('#start')

//Functions
//////////////////////////////////////////////////////////////////////////

function randomInt(hi) {
    return Math.floor(Math.random()* hi)
}

//Function to check for collision
function collisionCheck (){
    var obstacleX = parseInt($newObstacle.css("left"))
    var obstacleY = parseInt($newObstacle.css("top"))
    var skierX = parseInt($skier.css("left"))
    var skierY = parseInt($skier.css("top"))
    console.log(obstacleX)
    console.log(skierX)
    if (parseInt($skier.offset()) === parseInt($newObstacle.offset())) {
        $skier.toggle("explode")
        console.log("Wipeout!")
    } 
    //  if (parseInt(($newObstacle.css('left')) > skierX) && ($newObstacle.css('right') < skierX)){
    //     console.log("You good!")
    // }   

}


//Function to start skiing
$start.on("click", function (){
    console.log("You clicked start! Gnarly, bro!")
    //create skier
    $skier = $("<div id='skier'>")
    $slope.append($skier)
    skierInterval = setInterval(function(){
        console.log("Rip it!")
        $skier.css("top", "+=10px")
        console.log($skier.offset())
    },1000)

    //creates obstacle
    $newObstacle = $("<div id='obstacle'>")
    obstacleX = parseInt($newObstacle.css("left"))
    obstacleY = parseInt($newObstacle.css("top"))
    $newObstacle.css({
        "position": "absolute",
        "top": window.innerHeight,
        "color": "forestgreen",
        "border": "2px solid black",
        "width": "100px",
        "height": "100px",
        "left":  randomInt(window.innerWidth) + "px",
        "display": "inline-block",    
    })
    $slope.append($newObstacle)
    obstacleInterval = setInterval(function(){
        $newObstacle.css('top','-=5px')
        console.log($newObstacle.offset())
        collisionCheck()
        if (parseInt($newObstacle.css("top")) < 0){
            $newObstacle.css("top","800px")
            //calculate a new x for the obstacle
            $newObstacle.css("left",randomInt(window.innerWidth + "px"))
        }
    }, 10)
    
    
})

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

//Function to clear intervals
$stop.on('click',function(){
    clearInterval(skierInterval)
    clearInterval(obstacleInterval)
})








