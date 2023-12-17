import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

import { WIDTH, HEIGHT, movement, formElements } from "./consts.js";
import {
    textOutput,
    playerStop,
    letsScale,
    playerCollision,
} from "./utils.js";
import {
    drawDots,
    drawPlayer,
    drawBorder,
    drawToutchTarget,
    drawClearRect,
} from "./draw.js";
import { getUserDots, dotCollision } from "./utilsDots.js";
import { formLogic } from "./formLogic.js";

// const socket = io(`agario-server-production.up.railway.app`, {
//     transports: ["websocket"],
// });
const socket = io();
let mapSize = 0;
let ping = 0
const canvas = document.getElementById("canvas");
let strokeState = document.getElementById("stroke_state");
let strokeState2 = document.getElementById("stroke_state2");
canvas.width = WIDTH;
canvas.height = HEIGHT;
canvas.style.backgroundImage =
    'url("Leonardo_Diffusion_XL_factory_cyberpunk_city_photo_realism_2.jpg")';
const ctx = canvas.getContext("2d");
let scale = 1;

let translateX = 0;
let translateY = 0;
let userDots = {};
let dotsCountOnScreen = 0;



console.log(`player connection`, socket);
socket.emit("new player");
socket.on("players arr", (data) => {
    formLogic(data, formElements, socket);
    mapSize = data.size;
});
socket.emit("movement", movement);
socket.on("visibleDots", (dots) => {
    userDots = getUserDots(dots, { translateX, translateY }, scale);
    dotsCountOnScreen = Object.keys(userDots).length;
});
// socket.on('disconnect', () => {
//    alert("конец игры")
//    socket.connect();
//    socket.on('connect', () => {
//     console.log("потор соединения")
//     socket.emit("new player");
// });
// });

socket.on("loop", (players) => {
    if (players[socket.id]) {
        const player = players[socket.id];
        scale = letsScale(ctx, player.r, scale);
        drawClearRect(ctx, scale, { x: translateX, y: translateY });
        drawBorder(
            ctx,
            { x: translateX, y: translateY },
            { x: mapSize, y: mapSize }
        );

        textOutput(
            player,
            strokeState,
            strokeState2,
            ping,
            dotsCountOnScreen,
            Object.keys(players).length
        );

        translateX = WIDTH / 2 - player.positionX;
        translateY = HEIGHT / 2 - player.positionY;

        if (playerStop(player)) {
            movement.cordX = player.positionX + translateX;
            movement.cordY = player.positionY + translateY;
            socket.emit("movement", movement);
        }
        drawToutchTarget(ctx, {
            x: player.movementX + translateX,
            y: player.movementY + translateY,
        });

        for (let id in userDots) {
            drawDots(ctx, userDots[id], {
                translateX: translateX,
                translateY: translateY,
            });
            dotCollision(player, userDots, id, socket);
        }

        for (let id in players) {
            const myselfPlayer = players[socket.id];
            const otherPlayer = players[id];
            if (myselfPlayer) {
                drawPlayer(ctx, otherPlayer, myselfPlayer);
                playerCollision(myselfPlayer, players, id, socket);
            }
        }
    }
});

const touchListener = (obj, movement, socket) => {
    obj.addEventListener("touchstart", (event) => {
        event.preventDefault();
        const rect = canvas.getBoundingClientRect();
        let touch = event.touches[0];
        if (scale === 1) {
            movement.cordX = touch.clientX - rect.left;
            movement.cordY = touch.clientY - rect.top;
        }
        if (scale === 2) {
            movement.cordX = (touch.clientX - rect.left) * 2 - WIDTH / 2;
            movement.cordY = (touch.clientY - rect.top) * 2 - HEIGHT / 2;
        }
        if (scale === 4) {
            movement.cordX = (touch.clientX - rect.left) * 4 - WIDTH * 1.5;
            movement.cordY = (touch.clientY - rect.top) * 4 - HEIGHT * 1.5;
        }
        socket.emit("movement", movement);
    });
};

socket.on("pong", function (data) {
    ping = Date.now() - data;    
});
setInterval(()=> {socket.emit('ping', Date.now())}, 500)
touchListener(canvas, movement, socket);
