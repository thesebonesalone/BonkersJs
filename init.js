//build out game frame
const head = document.getElementsByTagName('head')[0]
let source = document.createElement('script')
//append Entities to source


//scene variables
let sceneWidth = 320
let sceneHeight = 320 //map size

let cameraWidth = 160
let cameraHeight = 144
let cameraX = 0
let cameraY = 0

let displayWidth = 1280
let displayHeight = 1152

//This is where I will eventually initiate the loading of the initial scene. The scene will contain the information regarding the
//tileset, the scene size and the assets needed to be loaded in


//Tileset Variables
let tileSize = 16
let tileMapWidth = 128
let tileMapHeigth = 128
let tileImage = document.createElement('img')
tileImage.setAttribute('src','Assets/Tilesets/TileSet.png')
tileImage.setAttribute('hidden','true')
head.append(tileImage)
//set Scene Map
let tiles = 
  [
    [29,28,29,28,29,28,29,28,29,28,29,21,55,22,26,26,26,26,26,26,], 
    [28,29,28,29,21,20,21,20,21,20,21,4,55,22,26,26,26,26,26,26,], 
    [29,21,20,21,1,2,2,2,3,4,4,4,55,30,26,26,26,26,26,26,], 
    [21,4,4,4,8,9,6,6,7,4,4,4,55,6,6,6,6,6,6,6,], 
    [19,4,35,36,37,4,5,6,7,25,25,25,55,9,9,9,9,9,9,6,], 
    [21,4,43,44,45,4,5,6,7,33,40,33,55,4,50,4,4,4,4,5,], 
    [19,4,33,41,33,4,8,9,10,4,11,4,16,63,13,63,63,39,4,5,], 
    [21,4,4,11,11,11,11,11,11,11,11,11,30,26,13,26,26,55,2,6,], 
    [19,4,4,4,38,63,63,63,63,63,39,11,4,4,11,1,2,55,6,6,], 
    [21,4,1,2,54,58,58,58,58,58,55,11,11,11,11,5,6,55,6,6,], 
    [4,4,5,6,54,58,58,58,58,58,55,2,3,11,1,6,6,55,6,6,], 
    [2,2,6,6,46,62,62,62,15,58,55,6,7,11,5,6,6,16,63,63,], 
    [6,6,6,6,7,4,49,49,54,58,55,9,10,11,5,6,6,22,26,26,], 
    [9,9,9,9,10,4,49,49,46,62,47,4,4,11,8,9,9,30,26,26,], 
    [15,4,4,4,4,4,4,4,42,42,42,42,4,11,42,42,42,42,42,42,], 
    [54,4,4,4,18,19,4,4,42,4,48,27,4,11,51,34,52,53,18,19,], 
    [54,4,4,18,29,21,4,4,42,48,48,4,4,11,59,60,60,61,20,28,], 
    [54,4,18,29,28,19,4,4,42,4,4,4,4,11,32,40,32,32,18,29,], 
    [54,18,29,28,29,28,19,18,19,18,19,18,19,11,11,11,4,4,20,28,], 
    [54,20,28,29,28,29,28,29,28,29,28,29,28,19,18,19,18,19,18,29,]  ];
let mapArray = [
    [58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,], 
    [18,19,12,12,12,12,12,18,29,58,12,12,12,12,12,12,12,12,34,24,], 
    [20,21,12,12,12,12,12,20,21,58,12,12,12,12,12,12,12,12,32,40,], 
    [18,19,6,6,6,6,6,18,29,58,12,12,12,6,6,6,6,6,6,6,], 
    [20,21,6,6,6,6,6,20,21,58,12,12,12,6,6,6,6,6,6,6,], 
    [18,19,6,12,12,12,12,58,58,58,58,58,12,6,6,6,6,6,6,6,], 
    [20,21,6,12,12,12,12,58,58,58,58,58,12,6,6,6,6,6,6,6,], 
    [18,19,6,12,12,12,12,58,58,58,58,58,12,6,6,6,6,6,6,6], 
    [20,21,4,12,12,12,12,58,58,58,58,58,12,6,6,6,6,6,6,6,], 
    [18,19,4,12,12,12,12,12,12,12,12,12,12,9,9,9,9,9,9,9,], 
    [20,21,4,4,4,4,4,12,12,12,12,12,12,4,4,4,4,4,4,4,], 
    [18,19,4,4,4,4,4,4,4,4,4,4,4,4,50,13,13,50,49,48,], 
    [20,21,4,48,48,48,42,42,14,15,26,26,26,26,26,13,13,26,26,26,], 
    [26,26,13,26,26,55,49,49,16,17,4,4,4,4,4,4,4,4,4,4,], 
    [26,26,13,26,26,55,49,49,22,23,4,4,4,4,4,4,4,4,4,4,], 
    [62,62,13,62,62,47,62,62,62,38,39,4,4,4,4,4,50,4,4,4,], 
    [4,11,11,4,11,4,11,4,11,46,47,4,4,50,4,4,4,4,11,11,], 
    [11,4,11,11,4,11,4,11,4,11,54,4,4,4,4,4,4,50,4,4,], 
    [4,11,11,4,4,11,4,4,11,4,54,4,4,4,4,4,4,4,4,4,], 
    [11,11,4,11,11,4,11,11,4,11,54,4,4,4,4,4,4,4,50,50,],
    ];




//since we are not using node.js we're gonna have to do this manually. Bummer. But here's a thing to make it slightly easier.
let files = [
    'Entities/entity.js',
    'Entities/player.js',
    'Entities/enemy.js',
    'Entities/missle.js',
    'Entities/star.js',
    'Scenes/defaultScene.js'
]

files.forEach(function(file){
    // debugger
    console.log(file)
    let fileSource = document.createElement('script')
    fileSource.setAttribute("src",file)
    head.append(fileSource)
})

source.setAttribute('src','index.js')
head.append(source)

// build canvas
const screenHolder = document.getElementsByClassName('full-screen')[0]
const mainCanvas = document.createElement("canvas")

mainCanvas.setAttribute("id","Main-Screen")
mainCanvas.setAttribute("width",`${displayWidth}`)
mainCanvas.setAttribute('height',`${displayHeight}`)
mainCanvas.setAttribute('style',"border:1px solid #000000;")
screenHolder.append(mainCanvas)

const holder = document.getElementById("sprite-holder")
function appendSprite(sprite){
    
    let img = document.createElement('img')
    img.setAttribute('hidden','true')
    img.setAttribute('id',sprite[0])
    img.setAttribute('src',sprite[1])
    holder.append(img)
}

let sprites = []
let backGround = document.createElement('img')
backGround.setAttribute('src','Assets/Backgrounds/testBackground.png')
backGround.setAttribute('hidden','true')
holder.append(backGround)

//Collider Function
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

//scene = new Scene(384,384,'Assests/Tilesets/OverWorld0.png', 'Assets/Backgrounds/testBackground.png',function(){})