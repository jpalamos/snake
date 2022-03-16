const crypto = require("crypto");
const { Game } = require("./game.server");

const EXPECTED_PLAYERS = 2;

let matches = [];
let playerSearching = [];
let startingMatches = [];

const addPlayer = (player) => {
  playerSearching.push(player);

  if (playerSearching.length >= EXPECTED_PLAYERS) {
    let playersReady = playerSearching.splice(0, 2);
    let match = new Match(playersReady);
    console.log("New Match Ready: " + match.id);

    matches.push(match);
    startingMatches.push(match);
  }
};
const removePlayer = (player)=>{
  playerSearching = playerSearching.filter((user)=> user.id != player.id);
}
class Match {
  constructor(players) {
    this.id = crypto.randomBytes(20).toString("hex");
    this.players = players;
    this.game = new Game();
    this.updateInterval = undefined;
  }

  startGame() {
    this.game.Start(this.players);
  }
}

module.exports = {
  addPlayer,
  removePlayer,
  startingMatches,
  matches,
};
