let playerId;
let players = [];
let eggs = [];

let flag = false;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  players.forEach((player, index) => {
    drawPlayer(player);
    if (player.id == playerId) {
      lblScore.innerHTML = player.score;
    }
  });
  eggs.forEach((egg) => {
    drawEgg(egg);
  });
}

export function startGame(data) {
  playerId = data.id;

  let divPlayers = document.getElementById("divPlayers");
  let lblScore = document.getElementById("score");

  let canvas = document.getElementById("divGame");
  let ctx = canvas.getContext("2d");

  setInterval(draw, 10);
}

export function updateState(state) {
  players = state.players;
  eggs = state.eggs;
  showScores();
}

function drawEgg(egg) {
  ctx.beginPath();
  ctx.fillRect(egg.x, egg.y, egg.size, egg.size);
  ctx.strokeRect(egg.x, egg.y, egg.size, egg.size);
  ctx.fillStyle = "#f5d142";
  ctx.fill();
  ctx.closePath();
}

function drawPlayer(player) {
  for (const part of player.snake) {
    ctx.beginPath();
    ctx.fillRect(part.x, part.y, player.size, player.size);
    ctx.strokeRect(part.x, part.y, player.size, player.size);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();
  }
}
function showScores() {
  divPlayers.innerHTML = "";
  let leaderBoard = [...players].sort((a, b) => b.score - a.score); //.slice(0,limit);
  leaderBoard.forEach((player) => {
    divPlayers.innerHTML +=
      "<div>" + player.username + " | " + player.score + "</div>";
  });
}

// setInterval(draw, 10);
