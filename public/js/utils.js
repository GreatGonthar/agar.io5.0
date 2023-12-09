import { WIDTH, HEIGHT } from "./consts.js";

let s = 1;

export const textOutput = (player, element, dotsCountOnScreen, playersNum) => {
    let name = player.id[0] + player.id[1] + player.id[2];
    let cords = {
        x: Math.floor(player.positionX),
        y: Math.floor(player.positionY),
    };

    element.innerText = `name: ${name}, x: ${cords.x}, y: ${
        cords.y
    }, players: ${playersNum}, velocity: ${(player.velocity * 1000).toFixed(
        2
    )}, r: ${player.r.toFixed(2)}`;
};

export const playerCollision = (myPlayer, players, id, socket) => {
    let otherPlayer = players[id];
    const distance = Math.sqrt(
        (otherPlayer.positionX - myPlayer.positionX) ** 2 +
            (otherPlayer.positionY - myPlayer.positionY) ** 2
    );
    if (
        distance < myPlayer.r - otherPlayer.r &&
        distance > 0 &&
        otherPlayer.r < myPlayer.r / 2
    ) {
        otherPlayer.r = 30;
        socket.emit("dellPlayer", id);
    }
};

export const playerStop = (player) => {
    if (
        Math.floor(player.movementX / 10) ===
            Math.floor(player.positionX / 10) &&
        Math.floor(player.movementY / 10) === Math.floor(player.positionY / 10)
    ) {
        return true;
    } else {
        return false;
    }
};

export const letsScale = (ctx, r, scale) => {
    s = scale;
    if (r > 100 && r < 200) {
        if (s === 1) {
            ctx.scale(1 / 2, 1 / 2);
            s = 2;
            ctx.translate(WIDTH / s, HEIGHT / s);           
        }
    }
    if (r > 200) {
        if (s === 2) {
            ctx.scale(1 / 2, 1 / 2);
            ctx.translate(WIDTH / 2, HEIGHT / 2);
            s = 4;
        }
    }
    return s;
};
