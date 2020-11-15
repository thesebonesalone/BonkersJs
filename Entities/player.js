// create player class
class Player extends Entity{
    constructor(x,y) {
        super(x,y)
        this.sprite = "LinkDown"
        this.name = "Player"
        this.hsp = 0
        this.vsp = 0
    }
    loop() {
        this.hitbox()
        // player movement
        





        this.hsp = ((right) - (left)) * 2
        this.vsp = ((down) - (up)) * 2
        if (right || left ){
            if (this.hsp > 0){
                this.sprite = "LinkRight"
            } else {
                this.sprite = "LinkLeft"
            }
        }
        if (up || down){
            if (this.vsp > 0){
                this.sprite = "LinkDown"
            } else {
                this.sprite = "LinkUp"
            }
        }
        this.x += this.hsp
        this.y += this.vsp

        if (this.x < 0){this.x = 0}
        if (this.x > sceneWidth){this.x = sceneWidth}
        if (this.y > sceneHeight){this.y = sceneHeight}
        if (this.y < 0){this.y = 0}
        if (fire === true && fireCount < 1) {
            new Missle(this.x,this.y)
        }
        cameraX = this.x - (cameraWidth/2)
        cameraY = this.y - (cameraHeight/2)

    }
    hitbox(){
        this.hb = [this.x,this.y,this.x+16,this.y+16]
    }
    
}

sprites = [
    ["LinkDown","./Assets/Sprites/Link/LinkDown.png"],
    ["LinkRight","./Assets/Sprites/Link/LinkRight.png"],
    ["LinkLeft","./Assets/Sprites/Link/LinkLeft.png"],
    ["LinkUp","./Assets/Sprites/Link/LinkUp.png"]
]

sprites.forEach(function(sprite){
    appendSprite(sprite)
})