var projectiles = [];
var rateOfFire = 0;

var objProjectile = {
    init: function() {
//        console.log('initProjectile');
        projectile = IM.getInstance('img/spriteProjectile');

        projectile.animation = new IIG.Animation({
            sWidth: 14,
            sHeight: 4,
            sx: 0,
            sy: 0,
            alternate: true
        });
    },
    update: function() {
//        console.log('updateProjectile');
        for (var i = 0; i < projectiles.length; i++) {
            if (projectiles[i].position === "right") {
                projectiles[i].x += projectiles[i].speed;
            } else {
                projectiles[i].x -= projectiles[i].speed;
            }

            if (projectiles[i].x > 800 || projectiles[i].x < 0) {
                projectiles.splice(i, 1);
            }

            for (var j = 0; j < enemies.length; j++) {
                if (enemies[j].die === false) {
                    beCollided = collide(projectiles[i], enemies[j]);
                }

                if (beCollided && !finish) {
                    enemies[j].life -= perso.power;

                    if (enemies[j].life <= 0) {

                        if (enemies[j].type === 'boss' && enemies[j].die === false) {
                            xplodebosssound.play();
                            enemies[j].die = true;
                            boss = false;
                            finish = true;
                            objScoreBar.update(enemies[j].points);

                            enemies[j].die = true;
                            enemies[j].image = IM.killInstance(enemies[j].image);
                            enemies[j].speed = 0;

                            enemies[j].image = IM.getInstance('img/xplodeboss');
                            enemies[j].image.animation = new IIG.Animation({
                                sWidth: 102,
                                sHeight: 100,
                                sx: 0,
                                sy: 0,
                                alternate: true,
                                animByFrame: 4,
//                                iterations: 1
                            });
                            setTimeout(function() {
                                endGame(true);
                            }, 3000);
                        }

                        if (enemies[j].type === 'soldier' && enemies[j].die === false) {
                            enemies[j].die = true;
                            enemies[j].image = IM.killInstance(enemies[j].image);
                            enemies[j].speed = 0;

                            enemies[j].image = IM.getInstance('img/soldierdead');
                            enemies[j].image.animation = new IIG.Animation({
                                sWidth: 60,
                                sHeight: 39,
                                sx: 0,
                                sy: 0,
                                alternate: true,
                                animByFrame: 4,
                                iterations: 1
                            });
                            if (enemies[j].side === 'left') {
                                enemies[j].image.animation.sy = 39;
                            }
                            objScoreBar.update(enemies[j].points);


                        }
                        if (enemies[j].type === 'commando' && enemies[j].die === false) {
                            enemies[j].die = true;
                            enemies[j].image = IM.killInstance(enemies[j].image);
                            enemies[j].speed = 0;

                            enemies[j].image = IM.getInstance('img/commandodead');
                            enemies[j].image.animation = new IIG.Animation({
                                sWidth: 40,
                                sHeight: 39,
                                sx: 0,
                                sy: 0,
                                alternate: true,
                                animByFrame: 4,
                                iterations: 1
                            });
                            if (enemies[j].side === 'left') {
                                enemies[j].image.animation.sy = 39;
                            }
                            objScoreBar.update(enemies[j].points);
                        }
                    }
                    projectiles.splice(i, 1);
                }
            }
        }
    },
    render: function() {
        for (var i = 0; i < projectiles.length; i++) {
            IM.drawImage(context, projectiles[i].image, projectiles[i].x, projectiles[i].y);

        }


    },
    add: function() {
        if (perso.image.animation.sy === 0 || perso.image.animation.sy === 150) {
            posX = perso.x + 40;
            positionPerso = "right";
        } else {
            posX = perso.x - 14;
            positionPerso = "left";
        }

        keyboard.space.counter = true;
        projectiles.push({
            image: projectile,
            x: posX,
            y: perso.y + 8,
            width: 14,
            height: 4,
            speed: 5,
            position: positionPerso
        });

    }
};