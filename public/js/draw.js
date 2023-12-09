import { WIDTH, HEIGHT, goodDot, playerText} from "./consts.js";
let translateX = 0;
let translateY = 0;

export const drawPlayer = (ctx, player, myPlayer, text) => {   
    const playerX = player.positionX;
    const playerY = player.positionY;
   
    translateX = WIDTH / 2 - myPlayer.positionX;
    translateY = HEIGHT / 2 - myPlayer.positionY;

    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.font = `${player.r*2}px Emulogic`;
    ctx.fillText(
        `${playerText[+player.name%10]}`,
        playerX + translateX,
        playerY + translateY
    );
    ctx.font = `${player.r/1.5}px Emulogic`;
    ctx.fillText(
        `${player.id[0] + player.id[1] + player.id[2]}`,
        playerX + translateX,
        playerY + translateY - player.r/1.5
    );
    ctx.closePath();
};
export const drawDots = (ctx, userDot, translate) => {    
    if(userDot){    
    let { id, x, y, r, color } = userDot;
    let { translateX, translateY } = translate;    
    ctx.beginPath();
    ctx.fillStyle = color;    
        ctx.font = `${r}px Emulogic`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
            goodDot[+id%10],
            x + translateX,
            y + translateY
        );   
    ctx.lineWidth = 2;
    ctx.stroke();
}
};

export const drawBorder = (ctx, cords, size) => {
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.rect(0 + cords.x, 0 + cords.y, size.x, size.y);
    ctx.stroke();
};

export const drawToutchTarget = (ctx, cords) => {
    ctx.beginPath();
    ctx.strokeStyle = "green";
    ctx.arc(cords.x, cords.y, 5, 0, Math.PI * 2);
    ctx.stroke();
};

export const drawClearRect = (ctx, scale, cords) => {
    if (scale === 1 || scale === 2) {
        // ctx.clearRect(0, 0, WIDTH, HEIGHT);
        const background = new Image();
        background.src = "Leonardo_Diffusion_XL_factory_cyberpunk_city_photo_realism_1.jpg"
        let slowCord = {}
        slowCord.x = cords.x/2
        slowCord.y = cords.y/2
        let correctionX =  Math.trunc(slowCord.x / 512)
        let correctionY =  Math.trunc(slowCord.y / 512)  

                ctx.drawImage(background, (slowCord.x - 512 )-(512*correctionX), (slowCord.y-512)-(512*correctionY), 512, 512);                 
                ctx.drawImage(background, (slowCord.x)-(512*correctionX), (slowCord.y-512)-(512*correctionY), 512, 512);
                ctx.drawImage(background, (slowCord.x + 512)-(512*correctionX), (slowCord.y-512)-(512*correctionY), 512, 512); 

                ctx.drawImage(background, (slowCord.x - 512 )-(512*correctionX), (slowCord.y)-(512*correctionY), 512, 512);                 
                ctx.drawImage(background, (slowCord.x)-(512*correctionX), (slowCord.y)-(512*correctionY), 512, 512);
                ctx.drawImage(background, (slowCord.x + 512)-(512*correctionX), (slowCord.y)-(512*correctionY), 512, 512);                

                ctx.drawImage(background, (slowCord.x - 512 )-(512*correctionX), (slowCord.y+512)-(512*correctionY), 512, 512);  
                ctx.drawImage(background, (slowCord.x - 512 )-(512*correctionX), (slowCord.y+512+512)-(512*correctionY), 512, 512);                   
                ctx.drawImage(background, (slowCord.x)-(512*correctionX), (slowCord.y+512)-(512*correctionY), 512, 512);
                ctx.drawImage(background, (slowCord.x)-(512*correctionX), (slowCord.y+512+512)-(512*correctionY), 512, 512);
                ctx.drawImage(background, (slowCord.x + 512)-(512*correctionX), (slowCord.y+512)-(512*correctionY), 512, 512); 
                ctx.drawImage(background, (slowCord.x + 512)-(512*correctionX), (slowCord.y+512+512)-(512*correctionY), 512, 512); 
       

    // } if (scale === 2) {
    //     ctx.clearRect(-WIDTH / 2, -HEIGHT / 2, 2 * WIDTH, 2 * HEIGHT); 
    }if (scale === 4) {
      ctx.clearRect(-1.5 * WIDTH, -1.5 * HEIGHT, 4 * WIDTH, 4 * HEIGHT);
    }
};
