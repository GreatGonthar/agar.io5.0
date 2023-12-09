import { WIDTH, HEIGHT, scale } from "./consts.js";

let userDots = {};

export const getUserDots = (dots, translate, scale) => {
    let { translateX, translateY } = translate;
    userDots = {};

    for (let id in dots) {
        let dot = dots[id];        
        if (         
            
            dot.x + translateX < WIDTH *2 &&
            dot.y + translateY < HEIGHT *2&&
            dot.x + translateX > 0 -WIDTH &&
            dot.y + translateY > 0 -HEIGHT
            // dot.x + translateX < WIDTH * 2.5 && if scale == 4
            // dot.y + translateY < HEIGHT * 2.5 &&
            // dot.x + translateX > -WIDTH * 1.5 &&
            // dot.y + translateY > -HEIGHT * 1.5
        ) {
            userDots[id] = dot;
        }
    }
    return userDots;
};

export const dotCollision = (player, dots, id, socket) => {
   
    let dot = dots[id]
    const distance = Math.sqrt(
        (dot.x - player.positionX) ** 2 + (dot.y - player.positionY) ** 2 );
    if (distance < player.r) {        
        dots[id].r = 1;
        dots[id].x = Math.random()*WIDTH*2
        dots[id].y = Math.random()*HEIGHT*2
        socket.emit("dellDot", id);        
    }
};
