const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//Set canvas size to fit the screen... could this be relative to fit all screens? this is a 16:9 aspect ratio
canvas.width = 1024 
canvas.height = 576

const scaledCanvas = { 
    width: canvas.width / 4, 
    height: canvas.height / 4
}

const floorCollisions2d = []
for(let i = 0; i < floorCollisions.length; i += 36) { 
    floorCollisions2d.push(floorCollisions.slice(i, i+36))
}


const collisionBlocks = []

floorCollisions2d.forEach((row, y) => { 
    row.forEach((symbol, x) => { 
        if (symbol === 202) { 
            collisionBlocks.push(new CollisionBlock({
                position: {
                    x: x * 16, 
                    y: y * 16 
                }}))
        }
    })
})

const PlatformCollisions2d = []
for(let i = 0; i < PlatformCollisions.length; i += 36) { 
    PlatformCollisions2d.push(PlatformCollisions.slice(i, i+36))
}

const PlatformCollisionBlocks = []

PlatformCollisions2d.forEach((row, y) => { 
    row.forEach((symbol, x) => { 
        if (symbol === 202) { 
            PlatformCollisionBlocks.push(new CollisionBlock({
                position: {
                    x: x * 16, 
                    y: y * 16 
                }}))
        }
    })
})

const gravity = 0.5

const player = new Player({ 
    position: { 
        x: 100, 
        y: 300,    
    }, 
    collisionBlocks,
    imageSrc: "./img/warrior/Idle.png",
    frameRate: 8, 
})


const keys = { 
    d: { 
        pressed: false
    }, 
    a: { 
        pressed: false
    }, 
}

const background = new Sprite({
    position: { 
        x: 0, 
        y:0, 
    }, 
    imageSrc: './img/background.png'
})

function animate() { 
    window.requestAnimationFrame(animate)
//^^ Calling recursive function to allow animation to happen
c.fillStyle = "white"
c.fillRect(0, 0, canvas.width, canvas.height)
//^^ Creates white canvas background, within function to clear background each time to stop character "dripping"

c.save()
c.scale(4,4)
c.translate(0, -background.image.height + scaledCanvas.height)
background.update()

collisionBlocks.forEach((collisionBlock) => { 
    collisionBlock.update()
})
// ^^ calling the collision blocks and rendering them on the screen

PlatformCollisionBlocks.forEach((block) => { 
    block.update()
})
player.update()


    player.velocity.x = 0 
    if (keys.d.pressed) player.velocity.x = 5
    else if (keys.a.pressed) player.velocity.x = -5 

c.restore() 

// ^^ c.save and c.restore wrap whatever is inside to stop it impacting globally


}

animate()

window.addEventListener('keydown', (event) => { 
    switch (event.key) { 
        case 'd': 
        keys.d.pressed = true
        break
       case 'a': 
        keys.a.pressed = true
        break
        case 'w': 
        player.velocity.y = -8
        break
    }
}) 

    window.addEventListener('keyup', (event) => { 
    switch (event.key) { 
        case 'd': 
        keys.d.pressed = false
        break
        case 'a': 
        keys.a.pressed = false
        break
    }
    
})

// takes an argument of what it is looking for (i.e. a keystroke)
