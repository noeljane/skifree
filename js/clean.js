/* 
Logic of the Game: 

Player 1 puts in name x
///////////////////////////////////
Form Submission
var $signupForm = $('#signup-form')
var $nameField = $('#name')
var $list = $('#playerList')

$signupForm.on('submit',function(evt){
    evt.preventDefault()
    var $newItem = $('<li>')
    $newItem.text($nameField.val())
    $list.append($newItem)

})

Player 1 plays x
    Form Submission
    Create skier
    Start Skiing
    Collision Check
        Player 1 crashes x
        Player 1 gets score x

Prompt Player 2 to play Game
    Form Submission
    Create Skier
    Start Skiing
    Collision Check
        Player 2 crashes
        Player 2 gets score

Compare player 1 score to player 2 score
Declare winner

Reset the whole game
*/