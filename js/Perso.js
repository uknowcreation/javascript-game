var objPerso = {
    init: function() {
//        console.log('initPerso');
        perso = IM.getInstance('img/spritePerso');
        perso.animation = new IIG.Animation({
            sWidth: 40,
            sHeight: 50,
            sx: 40,
            sy: 0,
            alternate: true
        });
        perso = {
            type: 'perso',
            image: perso,
            x: canvas.width / 2,
            y: canvas.height / 2,
            width: 40,
            height: 50,
            speed: 5,
            life: 100,
            power: 10,
            die: false
        };
    },
    update: function() {
//        console.log('updatePerso');
        if (keyboard.up && perso.die === false) {
            perso.image.animation.pauseAnimation = false;
            if ((perso.image.animation.sy === 50) || (perso.image.animation.sy === 100)) {
                perso.image.animation.sy = 50;
            } else {
                perso.image.animation.sy = 0;
            }
            if (perso.y > 15 && !keyboard.space)
                perso.y -= perso.speed;
        }

        if (keyboard.bottom && perso.die === false) {
            perso.image.animation.pauseAnimation = false;
            if ((perso.image.animation.sy === 50) || (perso.image.animation.sy === 100)) {
                perso.image.animation.sy = 50;
            } else {
                perso.image.animation.sy = 0;
            }
            if (perso.y + perso.height < canvas.height && !keyboard.space)
                perso.y += perso.speed;
        }

        if (keyboard.right && perso.die === false) {
            perso.image.animation.pauseAnimation = false;
            perso.image.animation.sy = 0;
            if (perso.x + perso.width < canvas.width && !keyboard.space) {
                perso.x += perso.speed;
            }
        }

        if (keyboard.left && perso.die === false) {
            perso.image.animation.pauseAnimation = false;
            perso.image.animation.sy = perso.image.animation.sHeight;
            if (perso.x > 0 && !keyboard.space) {
                perso.x -= perso.speed;
            }
        }

        if (keyboard.space && perso.die === false) {
            perso.image.animation.pauseAnimation = true;
            if (perso.image.animation.sy === 0) {
                perso.image.animation.sx = 40;
                perso.image.animation.sy = 150;
            }
            if (perso.image.animation.sy === 50) {
                perso.image.animation.sx = 40;
                perso.image.animation.sy = 100;
            }

            if (rateOfFire % 5 === 0){
                objProjectile.add(); 
                tir.play();
            }
        }

        if (!keyboard.up && !keyboard.right && !keyboard.bottom && !keyboard.left && !keyboard.space  && perso.die === false) {
            perso.image.animation.pauseAnimation = true;
            perso.image.animation.sx = perso.image.animation.sWidth;
        }

        rateOfFire++;
    },
    render: function() {
        IM.drawImage(context, perso.image, perso.x, perso.y);
    }
};