// create player class
class Player extends Entity{
    constructor(x,y) {
        super(x,y)
        this.sprite = "player-ship"
        this.name = "Player"
    }
    loop() {
        this.hitbox()
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

sprites = [
    ["player-ship","./Assets/Sprites/Ship.png"],
]

sprites.forEach(function(sprite){
    appendSprite(sprite)
})