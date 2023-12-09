let dots = {};
let dotId = 0;
class Dot {
    constructor(id, x, y, r = 5, color) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
    }
}

module.exports.createDots = (r, color, n, oreal) => {
    for (let i = 0; i < n; i++) {
        let x = Math.floor(Math.random() * oreal);
        let y = Math.floor(Math.random() * oreal);

        let id = dotId++;
        let dot = new Dot(id, x, y, r, color);
        dots[id] = dot;
    }
    return dots;
};

module.exports.dellDot = (dots, name, player, oreal) => {  
        if (+name || +name === 0) {
            dots[name].x = Math.floor(Math.random() * oreal);
            dots[name].y = Math.floor(Math.random() * oreal);
            if (+name % 10 > 1 && player.r < 250) {
                player.r += 2
            } else {
                player.r -= 1;
            }
        }
};
