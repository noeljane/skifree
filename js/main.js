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

Day 2
1. Make the obstacles come automatically 
2. Set up what a collision means


*/

// Variables
var $body = $('body')
var $skier = $('#skier')
var $turn = $('#turn')

//Variables to create multiple speeds and obstacles
var obstacleNames = ["tree","rock","ogre"]
var colors = ["green","black","grey"]
var speeds = [1000, 500, 100]

//Variable for start button
var $start = $('#start')

//Functions

//Function to create more obstacles
$start.on("click", function (){
    console.log("You clicked start! Gnarly, bro!")
    var $newObstacle = $('<div>')
    $newObstacle.css({
        "position": "absolute",
        "top": window.innerHeight,
        "color": "forestgreen",
        "border": "2px solid black",
        "width": "100px",
        "height": "100px", 
        "display": "inline",    
    })
    $skier.append($newObstacle)
    setInterval(function(){
        $newObstacle.css('top','-=5px')
    }, 100)
    
})

//Function to make my skier move
$turn.on('click', function (){
    console.log("Sick carves, brah!")
    $skier.css({
        "position": "relative",
        "left": "150px"
    })
})

// // Constructor Function ? 

// function obstacle(name,color){
//     this.name = name
//     this.print = function(){
//         console.log("I'm a " + name)
//     }
//     this.move = function (){
//         setInterval(function(){
//             $obstacle.css('left', '-=5px')

//         }, 500)
//     }
// }


//Function


//New obstacles 
// var tree = new obstacle('tree')