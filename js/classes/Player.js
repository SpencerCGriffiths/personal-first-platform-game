class Player extends Sprite { 
    constructor({position, collisionBlocks, platformCollisionBlocks, imageSrc, frameRate, scale = 0.5, animations}) { 
        super({imageSrc, frameRate, scale})
        this.position = position
        //^^ property filled object for positioning
        this.velocity = ({ 
            x: 0, 
            y: 1,
        })

        this.collisionBlocks = collisionBlocks

        this.platformCollisionBlocks = platformCollisionBlocks

        this.hitbox = { 
            position: { 
                x: this.position.x, 
                y: this.position.y,
            }, 
            width: 10, 
            height: 10,
        }

        this.animations = animations
        this.lastDirection = "right"
        this.jumping = false
        for (let key in this.animations) { 
            const image = new Image() 
            image.src = this.animations[key].imageSrc

            this.animations[key].image = image
        }

        this.camerabox = { 
            position: { 
                x: this.position.x - 50, 
                y: this.position.y - 10,
            }, 
            width: 200, 
            height: 80, 
        }
    }


    switchSprite(key) { 
        if(this.image === this.animations[key].image || !this.loaded) return

        this.currentFrame = 0
        this.image = this.animations[key].image
        this.frameBuffer = this.animations[key].frameBuffer
        this.frameRate = this.animations[key].frameRate
    }

    updateCameraBox() { 
        this.camerabox = { 
            position: { 
                x: this.position.x - 50, 
                y: this.position.y - 10,
            }, 
            width: 200, 
            height: 80, 
        }
    }

    shouldPanCamToRight({canvas, camera}){ 
        const camBoxRight = this.camerabox.position.x + this.camerabox.width
        const scaledDownCanvasWidth = canvas.width / 4

        
        if(camBoxRight >= 576) return
        if (camBoxRight >= scaledDownCanvasWidth + Math.abs(camera.position.x)) { 
            // panning the camera to the right at the speed that you are travelling:
            camera.position.x -= this.velocity.x
        }
    }

    shouldPanCamToLeft({canvas, camera}){ 
        const camBoxLeft = this.camerabox.position.x
        const scaledDownCanvasWidth = canvas.width / 4

        
        if(camBoxLeft <= 0) return
        if (camBoxLeft <= Math.abs(camera.position.x)) { 
            // panning the camera to the left at the speed that you are travelling:
            camera.position.x -= this.velocity.x
        }
    }

    shouldPanCamUp({canvas, camera}){ 
        const camBoxTop = this.camerabox.position.y
        
        if(camBoxTop + this.velocity.y <= 0 ) return
        if (camBoxTop <=  Math.abs(camera.position.y)) { 
            // panning the camera to the left at the speed of y velocity:
            camera.position.y -= this.velocity.y
        }
    }

    shouldPanCamDown({canvas, camera}){ 
        const camBoxTop = this.camerabox.position.y
        const scaledCanvasHeight = canvas.height / 4

        
        if(camBoxTop + this.camerabox.height + this.velocity.y >= 432 ) return
        if (camBoxTop + this.camerabox.height >=  Math.abs(camera.position.y) + scaledCanvasHeight) { 
            // panning the camera to the left at the speed of y velocity:
            camera.position.y -= this.velocity.y
        }
    }


    checkHorizontalCanvasCollision() { 
        if(this.hitbox.position.x + this.hitbox.width + this.velocity.x >= 576 
            || this.hitbox.position.x + this.velocity.x <= 0
        ) { 
            this.velocity.x = 0
        }
    }
    update() { 
        this.updateFrames()
        this.updateHitbox()

        this.updateCameraBox()
        //     //  this draws out the camera box
        // c.fillStyle = `rgba(255, 0, 255, 0.2)`
        // c.fillRect(this.camerabox.position.x, this.camerabox.position.y, this.camerabox.width, this.camerabox.height)

      
        // //this draws out the image rectangle
        // c.fillStyle = `rgba(0, 255, 0, 0.2)`
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        
        // //this draws out the hitbox
        // c.fillStyle = `rgba(255, 0, 0, 0.2)`
        // c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)

        this.draw()

        this.position.x += this.velocity.x
        this.updateHitbox()
        this.checkForHorizontalCollisions()
        this.applyGravity()
        this.updateHitbox()
        this.checkForVerticalCollisions()
    }

    updateHitbox() { 
        this.hitbox = { 
            position: { 
                x: this.position.x + 35, 
                y: this.position.y + 26
            }, 
            width: 14, 
            height: 27
        }
    }
    checkForHorizontalCollisions() { 
        for (let i = 0; i < this.collisionBlocks.length; i++) { 
            const collisionBlock = this.collisionBlocks[i]

            if (collision({object1: this.hitbox, object2: collisionBlock})) { 
                if (this.velocity.x > 0) { 
                    this.velocity.x = 0

                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width

                    this.position.x = collisionBlock.position.x - offset - 0.01
                    break
                } 
                if (this.velocity.x < 0) { 
                    this.velocity.x = 0

                    const offset = this.hitbox.position.x - this.position.x

                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
                    break
                }   
            }
        }
    }

    applyGravity() { 
        this.velocity.y += gravity
        this.position.y += this.velocity.y
    }

    checkForVerticalCollisions() { 
        // For collision blocks (on the floor )
        for (let i = 0; i < this.collisionBlocks.length; i++) { 
            const collisionBlock = this.collisionBlocks[i]

            if (collision({object1: this.hitbox, object2: collisionBlock})) { 
                if (this.velocity.y > 0) { 
                    this.velocity.y = 0
                    
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                    
                    this.position.y = collisionBlock.position.y - offset - 0.01
                    break
                } 
                if (this.velocity.y < 0) { 
                    this.velocity.y = 0
                    
                    const offset = this.hitbox.position.y - this.position.y

                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
                    break
                }   
            }
        }

        // For platform collision blocks
        for (let i = 0; i < this.platformCollisionBlocks.length; i++) { 
            const platformCollisionBlock = this.platformCollisionBlocks[i]

            if (platformCollision({object1: this.hitbox, object2: platformCollisionBlock})) { 
                if (this.velocity.y > 0 ) { 
                    this.velocity.y = 0
                    
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                    
                    this.position.y = platformCollisionBlock.position.y - offset - 0.01
                    break
                } 
            }
        }
    }
}