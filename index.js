document.addEventListener("DOMContentLoaded", function(){
    const canvas = document.getElementById("Main-Screen");
    const ctx = canvas.getContext("2d");
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
        // start.childNodes[1].innerText = `Up is ${up}`
        // start.childNodes[3].innerText = `Down is ${down}`
        // start.childNodes[5].innerText = `Left is ${left}`
        // start.childNodes[7].innerText = `Right is ${right}`
      
    })

    //Collider function. Takes two hitboxes and sees if they are NOT touching. If they are it returns true.
    function collider(hitbox1,hitbox2){
        let minAx = hitbox1[0]
        let minAy = hitbox1[1]
        let maxAx = hitbox1[2]
        let maxAy = hitbox1[3]
        let minBx = hitbox2[0]
        let minBy = hitbox2[1]
        let maxBx = hitbox2[2]
        let maxBy = hitbox2[3]
        let aLeftOfB = maxAx < minBx
        let aRightOfB = minAx > maxBx
        let aAboveB = minAy > maxBy
        let aBelowB = maxAy < minBy
        return !( aLeftOfB || aRightOfB || aAboveB || aBelowB)
    }
    //Initial Entity
    class Entity {
        constructor(x,y) {
            this.x = x
            this.y = y
            this.hb = [this.x,this.y,this.x + 16, this.y + 16]
            this.name = "Entity"
            this.fIndex = functionLoop.length
            functionLoop.push(this)
        }
        loop(){

        }
        hitbox(){

        }
        destroy() {
            functionLoop[this.fIndex] = false
        }
    }
    // create Enemy class
    class Enemy extends Entity{
        constructor(x,y) {
            super(x,y)
            this.name = "Enemy"
        }
        loop(){
            this.hitbox()
            let img = document.getElementById("enemy-ship")
            //debugger
            ctx.drawImage(img,this.x,this.y)
            for (const entity in functionLoop){
                let object = functionLoop[entity]
                    if (object){
                        if (object.name === "Player Missle") {
                            if (collider(this.hb, object.hb)){
                                this.destroy()
                                object.destroy()
                            }
                        }
                    }

                }
        }
        hitbox() {
            this.hb = [this.x,this.y,this.x+16,this.y+16]
        }



    }
    // create player class
    class Player extends Entity{
        constructor(x,y) {
            super(x,y)
            this.name = "Player"
        }
        loop() {
            this.hitbox()
            let img = document.getElementById("player-ship")
            //debugger
            ctx.drawImage(img,this.x,this.y)
            // player movement
            this.x += ((right) - (left)) * 2
            this.y += ((down) - (up)) * 2

            if (this.x < 0){this.x = 0}
            if (this.x > 208){this.x = 208}
            if (this.y > 272){this.y = 272}
            if (this.y < 224){this.y = 224}
            if (fire === true && fireCount < 1) {
                new Missle(this.x,this.y)
            }
        }
        hitbox(){
            this.hb = [this.x,this.y,this.x+16,this.y+16]
        }
        
    }
   




    //create Star class
    class Star extends Entity{
        constructor(x,y) {
            super(x,y)
            this.name = "Star"
            this.speed = Math.random() * 2 + 1
            this.color = ["#ffffff","#a4f5f3","#fff454","#ff0000"][Math.floor(Math.random()* 4)]
        }
        loop(){
            this.hitbox()
            this.y += this.speed
            ctx.fillStyle = this.color
            ctx.fillRect(this.x,this.y,1,1)
            if (this.y > 288) {
                this.destroy()
            }
        
        }
        hitbox(){
            this.hb = [-1,-1,0,0]
        }

    }
    // create player missle class
    class Missle extends Entity{
        constructor(x,y) {
            super(x,y)
            this.name = "Player Missle"
        }
        loop() {
            this.hitbox()
            let img = document.getElementById("player-missle")
            ctx.drawImage(img, this.x, this.y)
            this.y -= 4
            if (this.y < -16) {
                functionLoop[this.fIndex] = false
            }
        }
        hitbox(){
            this.hb = [this.x,this.y,this.x+16,this.y+16]
        }
    }
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
        for (const object in functionLoop){
            if (functionLoop[object]) {
            functionLoop[object].loop()
            }
        }
        if (fire === true){
            fireCount += 1
        }
    }
    setInterval(fireClock, 16.66)
})







    

    


