class Player {
    constructor(id, username, x, y) {
        this.id = id;
        this.username = username;
        this.x = x;
        this.y = y;
        this.score = 0;
        this.size = 10;
        this.state = true;
        this.startLength = 6;
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
        // console.log("CREATED:", this.snake);
    }
    moveSnake(axis) {
        const head = {
            x: this.snake[0].x + axis.horizontal * this.size,
            y: this.snake[0].y + axis.vertical * this.size,
        };
        // if (this.username === 'izq')
        // console.log(this.username, head, axis, this.snake[0],)
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
    checkColission(origin, width, height, axis) {
        let { x, y } = this.snake[0];
        if (x > width - this.size && axis.vertical === 0) {
            // console.log('x > width', this.username, axis)
            this.snake[0].x = origin;
        } else if (x < origin + this.size && axis.vertical === 0) {
            // console.log('x < origin', this.username, axis)
            this.snake[0].x = width
        }
        if (y > height - this.size && axis.horizontal === 0) {
            // console.log('y > height', this.username, axis)
            this.snake[0].y = origin;
        } else if (y < origin + this.size && axis.horizontal === 0) {
            // console.log('y < origin', this.username, axis)
            this.snake[0].y = height
        }
    }
    checkColission_snakes(otherSnakes) {
        let { x, y } = this.snake[0];
        let returnV = false
        otherSnakes.forEach(oSnake => {
            if (oSnake.snake.some((c) => {
                let dx = c.x - x;
                let dy = c.y - y;
                let rSum = this.size + 1;
                return dx * dx + dy * dy <= rSum * rSum;
            })) {
                // this.gameOver()
                returnV = true
            }
        });
        return returnV
    }
}
module.exports = {
    Player
}