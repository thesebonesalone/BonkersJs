//build out game frame
const head = document.getElementsByTagName('head')[0]
let source = document.createElement('script')
//append Entities to source


//scene variables
let sceneHeight = 0
let sceneWidth = 0


//since we are not using node.js we're gonna have to do this manually. Bummer. But here's a thing to make it slightly easier.
let files = [
    'Entities/entity.js',
    'Entities/player.js',
    'Entities/enemy.js',
    'Entities/missle.js',
    'Entities/star.js'
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

//define Canvas size
const canvasWidth = 224
const canvasHeight = 288

const screenHolder = document.getElementsByClassName('full-screen')[0]
const canvas = document.createElement("canvas")
canvas.setAttribute("id","Main-Screen")
canvas.setAttribute("width",`${canvasWidth}`)
canvas.setAttribute('height',`${canvasHeight}`)
canvas.setAttribute('style',"border:1px solid #000000;")
screenHolder.append(canvas)

function appendSprite(sprite){
    let holder = document.getElementById("sprite-holder")
    let img = document.createElement('img')
    img.setAttribute('hidden','true')
    img.setAttribute('id',sprite[0])
    img.setAttribute('src',sprite[1])
    holder.append(img)
}
let sprites = []

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