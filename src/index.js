









const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const cors = require("cors");
app.use(
    cors({
        origin: "*",
    })
);
app.use(express.static("public"));

const port = process.env.PORT || 3000;

const createDots = require("./dots").createDots;
const dellDot = require("./dots").dellDot;
const getPlayers = require("./player").getPlayers;
const getPlayerMovement = require("./player").getPlayerMovement;
const playerMoveLoop = require("./player").playerMoveLoop;
const scale = 1;
let speed = 1


httpServer.listen(port, () => console.log(`Server listening on port ${port}`));

const WIDTH = 300;
const HEIGHT = 600;
let FPS = 30;

let players = {};
let dots = {};
let size = 0
// dots = createDots(15, "green", 1000, 1000);
let touchCords;

io.on("connection", (socket) => {
    console.log("New client connected", socket.id);

    socket.on("new player", () => {
        getPlayers(players, socket);
        // dots = createDots(15, "green", num, 1000);
        socket.emit("players arr", { players, dots, size });
    });
    socket.on("form data", (data) => {
        let { dotsNum, mapSize, velocityForm, FPSform } = data;
        dots = createDots(15, "green", +dotsNum, +mapSize);
        FPS = FPSform;        
        speed = velocityForm/10
        size = mapSize
        socket.emit("players arr", { players, dots, size });
        setInterval(() => {
            playerMoveLoop(players, io);
        }, 1000 / FPS);
    });

    socket.on("movement", (touchCords) =>
        getPlayerMovement(players[socket.id], touchCords, speed)
    );

    socket.on("dellDot", (id) => {
        dellDot(dots, id, players[socket.id], size);
        
    });
    socket.on("dellPlayer", (id) => {
        players[id].r = 30
        players[id].positionX =  Math.floor(Math.random() * size)
        players[id].positionY = Math.floor(Math.random() * size)        
        // const clientSocket = io.sockets.sockets.get(id);
        // if (clientSocket) {
        //     clientSocket.disconnect(true);
        //     console.log('Соединение с клиентом разорвано: ' + id)
        // } else {
        //     console.log('Клиент с указанным id не найден');
        // }

        
    });

    socket.on("disconnect", () => {
        console.log(`player ${socket.id} disconnected`);
        delete players[socket.id];
    });

    setInterval(() => {
        socket.emit("visibleDots", dots);
    }, 100);
});


