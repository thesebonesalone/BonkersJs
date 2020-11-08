document.addEventListener("DOMContentLoaded", function(){
    const clockTick = new Event('clockTick')
    const start = document.getElementById("starter")
    let count = 0
    let score = 0
    //creates function loop to store which action to take each frame for each object
    const functionLoop = []
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
            fireCount += 1
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
    // Visual representation of the key presses
    document.addEventListener("clockTick", function(e){
        start.childNodes[1].innerText = `Up is ${up}`
        start.childNodes[3].innerText = `Down is ${down}`
        start.childNodes[5].innerText = `Left is ${left}`
        start.childNodes[7].innerText = `Right is ${right}`
      
    })
    // create player class
    class Player {
        constructor(x,y) {
            this.x = x
            this.y = y
            functionLoop.push(this)
        }
        loop() {
            const canvas = document.getElementById("Main-Screen");
            const ctx = canvas.getContext("2d");
            let img = document.getElementById("player-ship")
            //debugger
            ctx.drawImage(img,this.x,this.y)
            // player movement
            this.x += (right) - (left)
            this.y += (down) - (up)
            if (fire === true && fireCount <= 1) {
                new Missle(this.x,this.y)
            }
        }
        
    }
    // create player missle class
    class Missle {
        constructor(x,y) {
            this.x = x
            this.y = y
            this.fIndex = functionLoop.length
            functionLoop.push(this)

        }
        loop() {
            const canvas = document.getElementById("Main-Screen");
            const ctx = canvas.getContext("2d");
            let img = document.getElementById("player-missle")
            ctx.drawImage(img, this.x, this.y)
            this.y -= 4
            if (this.y < -16) {
                console.log("This should stop working")
                functionLoop[this.fIndex] = false
            }
        }



    }
    // initiates player object
    player1 = new Player(320,240)

    // defines the logic that fires every time 16.66 milliseconds passes which updates internal logic at 60 ticks per second, smooth framerate says what?
    function fireClock(){
        document.dispatchEvent(clockTick)
        if (fire === true){
            score += 10
        }
        //clear screen
        const canvas = document.getElementById("Main-Screen");
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 640, 480);
        for (const object in functionLoop){
            if (functionLoop[object]) {
            functionLoop[object].loop()
            }
        }
    }
    setInterval(fireClock, 16.66)
})







    

    


