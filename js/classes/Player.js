class Player { 
    constructor(position) { 
        this.position = position
        //^^ property filled object for positioning
        this.velocity = ({ 
            x: 0, 
            y: 1,
        })
        this.height = 100
    }

    draw() { 
        c.fillStyle = "red"
        c.fillRect(this.position.x, this.position.y, 100, this.height)
    }

    update() { 
        this.draw()
        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y < canvas.height) { 
            //^^ don't understand this.veloctiy.y and why it is relevant
            this.velocity.y += gravity
        } else { 
            this.velocity.y = 0
        }
        //^^ This is the gravity function checking for the bottom of the canvas
    }
}