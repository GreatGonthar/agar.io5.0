const WIDTH = 340;
const HEIGHT = 600;
const r = 30;


class Player {
    constructor(props) {
        this.name = props.name;
        this.id = props.id;
        this.r = r;
        this.positionX = props.positionX;
        this.positionY = props.positionY;
        this.velocity = 0;
        this.movementX = 100;
        this.movementY = 100;
        this.sin = 0;
        this.cos = 0;
        this.scale = 1;
    }
}

module.exports.getPlayers = (players, socket) => {
    players[socket.id] = new Player({
        id: socket.id,
        name: Object.keys(players).length,
        positionX: Math.floor(Math.random() * WIDTH),
        positionY: Math.floor(Math.random() * HEIGHT),

    });
};

module.exports.getPlayerMovement = (player, touchCords, speed) => {
    if (player) {
        let translateX = WIDTH / 2 - player.positionX;
        let translateY = HEIGHT / 2 - player.positionY;
        player.movementX = touchCords.cordX - translateX;
        player.movementY = touchCords.cordY - translateY;
        // let myHypot = Math.hypot(
        //     player.movementX - player.positionX,
        //     player.movementY - player.positionY
        //     );
        let myHypot = 1;
        player.velocity = myHypot / (player.r / speed);
        player.sin = (player.positionY - player.movementY) / myHypot;
        player.cos = (player.positionX - player.movementX) / myHypot;
    }
};

module.exports.playerMoveLoop = (players, io) => {
    if (players && io) {
        for (id in players) {
            let player = players[id];
            if (player.positionX) {
                player.positionX -= player.cos * player.velocity;
                player.positionY -= player.sin * player.velocity;
            }
        }
        io.sockets.emit("loop", players);
    }
};
