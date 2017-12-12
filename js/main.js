/*

Steps to get this work done: 

1. Link JS and CSS files x
2. Create an obstacle using a variable x
3. Create a constructor function 
4. Think about how the obstacle is moving across the screen
5. Create divs that measure where the obstacle needs to be in order to get the skier to jump over it. 
6. Move the skier and obstacle lower down
7. Is it possible to set it up vertically? 


*/

// Variables
var $body = $('body')
var $obstacle = $('.obstacle')
$obstacle.css('left', window.innerWidth)

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
        "top":"window.innerHeight",
        "color": "forestgreen",
        "border": "2px solid black",
        "width": "100px",
        "height": "100px",     
    })
    $body.append($newObstacle)
    setInterval(function(){
        $newObstacle.css('top','-=5px')
    }, 500)
    
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