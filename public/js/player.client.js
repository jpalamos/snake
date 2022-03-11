export class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 10;
        this.state = true;
        this.startLength = 3;
        this.snake = [];
        this.color = "#" + Math.floor(Math.random() * 16777215).toString(16);

        this.createParts();
    }

    createParts() {
        for (let i = 0; i < this.startLength; i++) {
            this.snake.push({
                x: this.x - i * this.size,
                y: this.y,
            });
        }
    }

    draw(ctx) {
        for (const part of this.snake) {
            ctx.beginPath();
            ctx.fillRect(part.x, part.y, this.size, this.size);
            ctx.strokeRect(part.x, part.y, this.size, this.size);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }
    }
    moveSnake(axis) {
        const head = {
            x: this.snake[0].x + axis.horizontal * this.size,
            y: this.snake[0].y + axis.vertical * this.size,
        };

        this.snake.unshift(head);
        this.snake.pop();
    }
    grow(axis) {
        const tail = {
            x: this.snake[this.snake.length - 1].x + axis.horizontal * this.size,
            y: this.snake[this.snake.length - 1].y + axis.vertical * this.size,
            size: this.size,
        };
        // Add the new head to the beginning of snake body
        this.snake.push(tail);
    }
    checkColission(origin, width, height) {
        let { x, y } = this.snake[0];
        if (x > width - this.size) {
            this.state = false;
        } else if (x < origin + this.size) {
            this.state = false;
        }
        if (y > height - this.radius) {
            this.state = false;
        } else if (y < origin + this.size) {
            this.state = false;
        }
    }
}