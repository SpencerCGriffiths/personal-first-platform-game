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

const platformCollisionBlocks = []

PlatformCollisions2d.forEach((row, y) => { 
    row.forEach((symbol, x) => { 
        if (symbol === 202) { 
            platformCollisionBlocks.push(new CollisionBlock({
                position: {
                    x: x * 16, 
                    y: y * 16 
                },
                height: 4}))
        }
    })
})

const gravity = 0.1

const player = new Player({ 
    position: { 
        x: 100, 
        y: 300,    
    }, 
    collisionBlocks,
    platformCollisionBlocks,
    imageSrc: "./img/warrior/Idle.png",
    frameRate: 8, 
    animations: { 
        Idle: { 
            imageSrc: "./img/warrior/Idle.png",
            frameRate: 8,
            frameBuffer: 6,
        },
        IdleLeft: { 
            imageSrc: "./img/warrior/IdleLeft.png",
            frameRate: 8,
            frameBuffer: 6,
        }, 
        Run: { 
            imageSrc: "./img/warrior/Run.png",
            frameRate: 8,
            frameBuffer: 5,
        },
        RunLeft: { 
            imageSrc: "./img/warrior/RunLeft.png",
            frameRate: 8,
            frameBuffer: 5,
        },
        Jump: { 
            imageSrc: "./img/warrior/Jump.png",
            frameRate: 2,
            frameBuffer: 3,
        },
        JumpLeft: { 
            imageSrc: "./img/warrior/JumpLeft.png",
            frameRate: 2,
            frameBuffer: 3,
        },
        Fall: { 
            imageSrc: "./img/warrior/Fall.png",
            frameRate: 2,
            frameBuffer: 3,
        },
        FallLeft: { 
            imageSrc: "./img/warrior/FallLeft.png",
            frameRate: 2,
            frameBuffer: 3,
        }
    }
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

const backgroundImgHeight = 432

const camera = { 
    position: { 
        x: 0, 
        y: -backgroundImgHeight + scaledCanvas.height, 
    }
}

function animate() { 
    window.requestAnimationFrame(animate)
//^^ Calling recursive function to allow animation to happen
c.fillStyle = "white"
c.fillRect(0, 0, canvas.width, canvas.height)
//^^ Creates white canvas background, within function to clear background each time to stop character "dripping"

c.save()
c.scale(4,4)
c.translate(camera.position.x, camera.position.y)
background.update()

// renders the collision blocks !!!!!! 

// collisionBlocks.forEach((collisionBlock) => { 
//     collisionBlock.update()
// })
// // ^^ calling the collision blocks and rendering them on the screen

// platformCollisionBlocks.forEach((block) => { 
//     block.update()
// })

player.checkHorizontalCanvasCollision()
player.update()

// Handling sprite switching:
    player.velocity.x = 0 
    if (keys.d.pressed) { 
        player.switchSprite(`Run`)
        player.lastDirection = `right`
        player.velocity.x = 2
        player.shouldPanCamToRight({canvas, camera})
    }else if (keys.a.pressed) {
        player.switchSprite(`RunLeft`)
        player.lastDirection = `left`
        player.velocity.x = -2
        player.shouldPanCamToLeft({canvas, camera})
    } else if (player.velocity.y === 0) { 
        if(player.lastDirection === "right") { 
            player.switchSprite("Idle")
        } else if (player.lastDirection === "left") { 
            player.switchSprite("IdleLeft")
        }
    } 
    
    if (player.velocity.y < 0) {
        player.shouldPanCamUp({camera, canvas})
        if(player.lastDirection === "right") { 
            player.switchSprite(`Jump`) 
        } else if (player.lastDirection === "left") { 
            player.switchSprite(`JumpLeft`) 
        }
    } else if (player.velocity.y > 0 ) { 
        player.shouldPanCamDown({camera, canvas})
        if(player.lastDirection === "right") { 
            player.switchSprite(`Fall`) 
        } else if (player.lastDirection === "left") { 
            player.switchSprite(`FallLeft`)
        }
    }


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
        player.velocity.y = -4
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
