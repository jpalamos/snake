export const name = "Egg";

export class Egg {
    constructor(x, y) {
        // console.log(`New Coin at (${x},${y})`);
        this.x = x;
        this.y = y;
        this.points = 1;
        this.size = 10;
        this.taken = false;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.strokeRect(this.x, this.y, this.size, this.size);
        ctx.fillStyle = "#f5d142";
        ctx.fill();
        ctx.closePath();
    }

    take(snake) {
        if (!this.taken) {
            let dx = snake.x - this.x;
            let dy = snake.y - this.y;
            let rSum = this.size + 1;
            return dx * dx + dy * dy <= rSum * rSum;
        }
    }
    isTaken() {
        return this.taken;
    }
}