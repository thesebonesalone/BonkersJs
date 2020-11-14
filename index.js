const ctx = canvas.getContext("2d");
const clockTick = new Event('clockTick')
const start = document.getElementById("starter")
let entityCount = 0
let count = 0
let score = 0
//creates function loop to store which action to take each frame for each object
const functionLoop = {}
//creates bools for key presses
let up = false
let down = false
let left = false
let right = false
let fire = false
let fireCount = 0
// creates listeners for arrow keys and determines if they are or are not pressed
document.addEventListener("keydown", function(e){
    if (e.key === "ArrowUp"){
        up = true
    }
    if (e.key === "ArrowDown"){
        down = true
    }
    if (e.key === "ArrowLeft"){
        left = true
    }
    if (e.key === "ArrowRight"){
        right = true
    }
    if (e.key === " "){
        fire = true
        
    }
})
document.addEventListener("keyup", function(e){
    if (e.key === "ArrowUp"){
        up = false
    }
    if (e.key === "ArrowDown"){
        down = false
    }
    if (e.key === "ArrowLeft"){
        left = false
    }
    if (e.key === "ArrowRight"){
        right = false
    }
    if (e.key === " "){
        fire = false
        fireCount = 0
    }
})

// initiates player object
player1 = new Player(112,240)
for (let i = 0; i < 224; i += 16) {
    new Enemy(i,24)
    new Enemy(i,48)
    new Enemy(i,72)
}

// defines the logic that fires every time 16.66 milliseconds passes which updates internal logic at 60 ticks per second, smooth framerate says what?
function fireClock(){
    document.dispatchEvent(clockTick)
    count += 1
    if (count % 3 === 0){
        new Star(Math.floor(Math.random() * 224),-20)
    }
    if (fire === true){
        score += 10
    }
    //clear screen
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 224, 288);
    //logic loop
    for (const object in functionLoop){
        functionLoop[object].loop()
    }
    //draw loop
    for (const object in functionLoop){
        functionLoop[object].draw()
    }
    if (fire === true){
        fireCount += 1
    }
}
setInterval(fireClock, 16.66)













