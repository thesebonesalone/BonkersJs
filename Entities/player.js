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

// movement with sprite assignment 

        this.hsp = ((right) - (left))
        this.vsp = ((down) - (up))
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
        // if going to move into wall reduce speed to 0.(Might only work if speed is non-decimal) check if speed will move into wal if yes reduce speed by 1  

        // area of player contact .x= left .y=top .x+16=right .y+16=bottom 
        // let edges = [5,6,7,8,12,13,14,15,20,21,22,23,24,25,27,28,29]
        // this.hb = [(0)this.x,(1)this.y,(2)this.x+16,(3)this.y+16]
       let side_to_check;
        if (this.hsp > 0){                // is player moving right?
            side_to_check = this.hb[2]  // side_to_check = right_side
        }else{
            side_to_check = this.hb[0]  // else side_to_check = left_side
        } 
        // while (side_to_check, top_side) or (side_to_check, bottom_side) { checks (x,y) 
        while((mapArray[Math.floor(this.hb[1]/16)][Math.floor((side_to_check + this.hsp)/16)]) > 13 || (mapArray[Math.floor(this.hb[3]/16)][Math.floor((side_to_check + this.hsp)/16)]) > 13 ){    
            this.hsp = 0 
        }                                                                   // }
        this.x += this.hsp                                                  // this.x += this.hsp

// is player moving down? side_to_check = bottom_side else side_to_check = top_side
        if(this.vsp > 0){
            side_to_check = this.hb[3] 
        }else{
            side_to_check = this.hb[1]  
        }                   //check (y,x) because of map array set up first idx is y value and x is how deep on y array
        while((mapArray[Math.floor((side_to_check + this.vsp)/16)][Math.floor(this.hb[0]/16)]) > 13 || (mapArray[Math.floor((side_to_check + this.vsp)/16)][Math.floor(this.hb[2]/16)]) > 13){    
            this.vsp = 0 
        }                                                                   // }
        this.y += this.vsp
       
// while (left_side, side_to_check) or (right_side, side_to_check) {
// 	this.vsp -= 1 * (this.vsp > 0) + (this.vsp < 0)
// }

        if (this.x < 0){this.x = 0}
        if (this.x > sceneWidth - 16){this.x = sceneWidth - 16}
        if (this.y > sceneHeight - 16){this.y = sceneHeight - 16}
        if (this.y < 0){this.y = 0}
        if (fire === true && fireCount < 1) {
            new Missle(this.x,this.y)
        }
        cameraX = this.x - (cameraWidth/2)
        cameraY = this.y - (cameraHeight/2)

        cameraX < 0 ? cameraX = 0 : null;
        cameraX > sceneWidth - cameraWidth ? cameraX = sceneWidth - cameraWidth : null;

        cameraY < 0 ? cameraY = 0 : null;
        cameraY > sceneHeight - cameraHeight ? cameraY = sceneHeight - cameraHeight : null;


    }
    hitbox(){
        // where to configure repulsion area 
        // area of player contact .x= left .y=top .x+16=right .y+16=bottom 
        this.hb = [this.x+3,this.y+3,this.x+13,this.y+13]
    }
    
    // Math.floor(x/16) 

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