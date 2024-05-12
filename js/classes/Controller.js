class GameController {
    constructor(options) {
        this.buttons = options.buttons;
        this.context = options.context; 
    }

    draw() {
        this.buttons.forEach(button => {
            this.context.fillStyle = button.color;
            this.context.fillRect(button.x, button.y, button.width, button.height);
            this.context.fillStyle = 'white';
            this.context.font = '16px Arial';
            this.context.fillText(button.label, button.x + 10, button.y + button.height / 2 + 5);
        });
    }

    checkClick(x, y) {
        this.buttons.forEach(button => {
            if (x >= button.x && x <= button.x + button.width && y >= button.y && y <= button.y + button.height) {
                button.onClick();
            }
        });
    }
}