import { startGame, updateState } from "./game.client.js";
import { gameHtml } from "./gameRender.js";
import { axis } from "./controls.js";

let socket;
let searching = false;
let searchAnimationInterval;
//Referencias DOM
var lblOnlinePlayers = document.getElementById("lblOnlinePlayers");
var btnBuscarPartida = document.getElementById("btnSearchMatch");
var lblSearching = document.getElementById("lblSearching");
var divLobby = document.getElementById("divLobby");
var divGame = document.getElementById("divGame");

const params = new URLSearchParams(window.location.search);

if (!params.has("username")) {
  window.location = "index.html";
  throw new Error("Se requiere el username");
}

let username = params.get("username");
socket = io(window.location.host + "?username=" + username);


//Listeners
socket.on("connect", function () {
  console.log("Conexión exitosa");
});
socket.on("welcome", function (data) {
  console.log("Server: " + data.message);
  lblOnlinePlayers.innerHTML = data.onlineUsers.length;
});
socket.on("onlineUsers", function (data) {
  console.log("Server: " + data.message);
  lblOnlinePlayers.innerHTML = data.onlineUsers.length;
});
socket.on("matchReady", function (data) {
  console.log(data.msg, data.match);
  divLobby.style.visibility = "hidden";
  divGame.style.visibility = "visible";
  divGame.innerHTML = gameHtml;

  startGame(socket.id);
});

socket.on("updateState", function (data) {
  updateState(data.state);
});


socket.on("connectionRejected", function (resp) {
  console.log("Desconectado",resp);
  window.location = "index.html";
});
socket.on("error", function (reason) {
  console.log(reason);
});

const sendAxis = ()=>
{
  socket.emit("move",axis);
}

document.addEventListener("onAxisChange",sendAxis);

btnBuscarPartida.onclick = function () {
  if (!searching) {
    socket.emit("searchMatch");
    matchSearchStart();
    this.innerHTML = "Cancelar";
    searching = true;
  } else {
    socket.emit("stopSearchMatch");
    matchSearchEnd();
    this.innerHTML = "Buscar Partida";
    searching = false;
  }
};

function matchSearchStart() {
  searchAnimationInterval = setInterval(searchingAnimation, 400);
}

function matchSearchEnd() {
  clearInterval(searchAnimationInterval);
  lblSearching.innerHTML = "";
}

function searchingAnimation() {
  let searchText = lblSearching.innerHTML;
  if (searchText == "") {
    lblSearching.innerHTML = "Buscando";
  } else if (searchText.split(".").length < 4) {
    lblSearching.innerHTML += ".";
  } else {
    lblSearching.innerHTML = "Buscando";
  }
}
