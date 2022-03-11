const { io } = require("./app.js");
// const { STATE, spawnPlayer, setAxis, removePlayer } = require("./game.server");
const matchmaking = require("./matchmaking");
const SERVER_TIME_STEP = 100;

let onlineUsers = [];
let clients = {};

const validation = (username) => {
  return true;
};

io.use((client, next) => {
  let username = client.handshake.query.username;
  console.log("Middleware: validando conexion ", username, client.id);

  if (validation(username)) {
    return next();
  }
  //client.disconnect();
  return next(new Error("authentication error"));
});

io.on("connection", (client) => {
  let username = client.handshake.query.username;
  console.log("Usuario Conectado", username, client.id);

  let user = { id: client.id, username: username };
  onlineUsers.push(user);

  client.emit("welcome", {
    message: "Bienvenido al juego",
    id: client.id,
    onlineUsers,
  });
  client.broadcast.emit("onlineUsers", {
    message: "Se ha Conectado un usuario",
    user,
    onlineUsers,
  });
  //Listeners
  client.on("searchMatch", () => {
    console.log(`${user.username} esta buscando partida`);
    matchmaking.addPlayer(user);
  });
  client.on("move", (axis) => {
    // setAxis(client.id, axis);
  });
  client.on("disconnect", () => {
    console.log("Usuario desconectado");
    // removePlayer(client.id);
    client.broadcast.emit("userDisconnection", {
      message: "Se ha desconectado un usuario",
    });
  });
});

const sendState = () => {
  let ping = Math.floor(Math.random() * 1000) + 500;
  setTimeout(() => {
    io.emit("updateState", { state: STATE });
  }, ping);
};

const startMatchReady = (match) => {
  let room = match.id;

  for (const player of match.players) {
    player.room = room;
    // io.sockets.connected[player.id].join(room);
    io.sockets.sockets.get(player.id).join(room);
    //
  }
  io.to(room).emit("matchReady", {
    msg: "Match Reaady",
    match: match.id,
  });

  match.startGame();

  setInterval(() => {
    io.to(room).emit("updateState", { state: match.game.STATE });
  });
};
const lookForMatchReady = () => {
  setInterval(() => {
    if (matchmaking.startingMatches.length > 0) {
      let matchReady = matchmaking.startingMatches.shift();
      console.log("Starign Match: " + matchReady.id);
      startMatchReady(matchReady);
    }
  }, 1000);
};

lookForMatchReady();
// setInterval(() => {
//   sendState();
// }, SERVER_TIME_STEP);
