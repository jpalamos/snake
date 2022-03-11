const { Egg } = require("./egg.server");
const { Player } = require("./player.server");

class Game {
  constructor() {
    this.CANVAS_WIDTH = 500;
    this.CANVAS_HEIGHT = 400;
    this.LOOP_PERIOD = 100;
    this.STATE = {
      players: [],
      eggs: [],
    };
    this.axes = {};
    this.loop;
    this.spawners = [];
  }

  Start(players) {
    players.forEach((player) => {
      this.spawnPlayer(player);
    });
    this.loop = setInterval(
      function () {
        this.update();
      }.bind(this),
      this.LOOP_PERIOD
    );

    this.spawners.push(
      setInterval(
        function () {
          this.spawnEgg();
        }.bind(this),
        Math.floor(Math.random() * 5000) + 1000
      )
    );
  }
  update() {
    this.STATE.players.forEach((player) => {
      if (player.state) {
        player.moveSnake(this.axes[player.id]);
      }
      //Se Verifica si los hieos han sido tomados
      this.STATE.eggs = this.STATE.eggs.filter((egg) => {
        if (!egg.take(player.snake[0])) {
          return egg;
        } else {
          console.log("Egg picked");
          player.grow(this.axes[player.id]);
          player.score += egg.points;
        }
      });

      player.checkColission(0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    });
  }

  spawnPlayer(player) {
    this.STATE.players.push(
      new Player(
        player.id,
        player.usernameusername,
        Math.floor(Math.random() * (this.CANVAS_WIDTH / 2 - 10)) + 10,
        Math.floor(Math.random() * (this.CANVAS_HEIGHT - 10)) + 10
      )
    );
    this.axes[player.id] = {
      horizontal: 1,
      vertical: 0,
    };
  }

  spawnEgg() {
    let y = Math.floor(Math.random() * (this.CANVAS_HEIGHT - 10)) + 10;
    let x = Math.floor(Math.random() * (this.CANVAS_WIDTH - 10)) + 10;

    let newEgg = new Egg(x, y);
    this.STATE.eggs.push(newEgg);
  }

  setAxis = (id, axis) => {
    this.axes[id] = axis;
  };

  removePlayer = (playerId) => {
    this.STATE.players = STATE.players.filter((player) => {
      if (player.id != playerId) return player;
    });
  };
}

module.exports = {
  Game,
};
