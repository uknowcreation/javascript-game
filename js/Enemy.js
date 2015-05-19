var enemies = [];
var collisionRate = 0;
var enemiesAnimations = [];
var waveEnemies = [];
var waveNumber = 0;
var wave = [];
var nSoldier = 2;
var nCommando = 1;
var boss = false;
var popBoss = false;
var bossShoot = [];
var bossShootAnimation = [];
var finish = false;
var bossTire = false; // Boolean pour savoir si le boss est en train de tirer
var enemyBoss;
var collided;

var objEnemy = {
    init: function() {
        wave.push({
            number: nSoldier,
            type: 'soldier'
        });
        wave.push({
            number: nCommando,
            type: 'commando'
        });

        this.add(wave);
    },
    update: function() {

        for (var i = 0; i < enemies.length; i++) {
            if (enemies[i].side === 'right' && enemies[i].type !== 'boss') {
                enemies[i].x -= enemies[i].speed;
            }
            if (enemies[i].side === 'left' && enemies[i].type !== 'boss') {
                enemies[i].x += enemies[i].speed;
            }

            if (enemies[i].type === 'boss') {
                if (enemies[i].x <= 700) {
                    enemyBoss = enemies[i];
                    // Mouvement vertical du boss
                    // ===========

                    if (enemies[i].direction === 'up') {
                        if (enemies[i].y > 15)
                            enemies[i].y -= enemies[i].speed;
                        else
                            enemies[i].direction = 'down';
                    }

                    if (enemies[i].direction === 'down') {
                        if (enemies[i].y < (canvas.height - 80))
                            enemies[i].y += enemies[i].speed;
                        else
                            enemies[i].direction = 'up';
                    }

                    // Changement d'image pour le boss en fonction de si il tire ou pas...
                    // ===========

                    if (bossTire && enemies[i].die === false)
                    {
                        if (enemies[i].image.data.attributes[1] !== 'img/spriteBossShoot')
                        {
                            enemies[i].image = IM.killInstance(enemies[i].image);

                            var bossShootAnimation = IM.getInstance('img/spriteBossShoot');
                            enemies[i].image = bossShootAnimation;
                            setTimeout(function() {
                                bossTire = false;
                            }, 300);

                            if (rateOfFire % 20 === 0) {
                                objProjectileBoss.add(enemies[i]);
                            }

                        }
                    }
                    else if (enemies[i].image.data.attributes[1] !== 'img/spriteBoss' && enemies[i].die === false)
                    {
                        setTimeout(function() {
                            bossTire = true;
                        }, 300);
                        enemies[i].image = IM.killInstance(enemies[i].image);

                        enemies[i].image = IM.getInstance('img/spriteBoss');
                        enemies[i].image.animation = new IIG.Animation({
                            sWidth: 70,
                            sHeight: 62,
                            sx: 70,
                            sy: 0,
                            alternate: true
                        });
                    }


                } else {
                    enemies[i].x -= enemies[i].speed;
                }
            }

            if ((enemies[i].x < 0 - enemies[i].width) && (enemies[i].side === 'right')) {
                perso.life--;
                enemies[i].image = IM.killInstance(enemies[i].image);
                enemies.splice(i, 1);
            } else {
                if ((enemies[i].x > 800 + enemies[i].width) && (enemies[i].side === 'left')) {
                    perso.life--;
                    enemies[i].image = IM.killInstance(enemies[i].image);
                    enemies.splice(i, 1);
                }
            }

            beCollided = collide(enemies[i], perso);
            if (beCollided) {
                if (collisionRate % 15 === 0) {
                    collided = true;
                    perso.life -= enemies[i].power;
                }

                if (perso.life <= 0 && perso.die === false) {
                    persodie.play();
                    perso.die = true;
                    perso.image = IM.killInstance(perso.image);
                    perso.speed = 0;

                    perso.image = IM.getInstance('img/persodead');
                    perso.image.animation = new IIG.Animation({
                        sWidth: 50,
                        sHeight: 70,
                        sx: 0,
                        sy: 0,
                        alternate: true
                    });

                    setTimeout(function() {
                        endGame(false);
                    }, 3000);
                }
            }
        }
        ;
        collisionRate++;
        if (enemies.length === 0 && !boss && !finish) {
            wave = [];
            if (score > 500 ) { // 200
                boss = true;
            } else {
                boss = false;
            }
            nSoldier += 2;
            nCommando += 1;

            wave.push({
                number: nSoldier,
                type: 'soldier'
            });
            wave.push({
                number: nCommando,
                type: 'commando'
            });
            this.add(wave);
        }
        if (boss && !finish && !popBoss) {
            playsound.stop();
            popbosssound.play();
            setTimeout(function(){
                bossfinal.play();
            }, 2100);
            
            wave = [];

            wave.push({
                number: 1,
                type: 'boss'
            });
            popBoss = true;
            this.add(wave);
        }
    },
    render: function() {
        for (var i = 0; i < enemies.length; i++) {
            if (enemies[i].type === "boss") {
                IM.drawImage(context, enemies[i].image, enemies[i].x, enemies[i].y);
                objLifeBarBoss.render(enemies[i]);

                continue;
            }
            if (enemies[i] && enemies[i].image.animationDestroyed) {
                enemies[i] = IM.killInstance(enemies[i]);
                enemies.splice(i, 1);

                continue;
            }

            IM.drawImage(context, enemies[i].image, enemies[i].x, enemies[i].y);
        }
        if (collided) {
            context.fillStyle = "rgba(234, 56, 56, 0.15)";
            context.fillRect(0, 0, 800, 600);
            setTimeout(function() {
                collided = false;
            }, 100);
        }



    },
    add: function(wave) {
        waveNumber++;
        for (var j = 0; j < wave.length; j++) {
            for (var i = 0; i < wave[j].number; i++) {
                if (i === 0) {
                    enemiesAnimations = [];
                }
                side = this.leftOrRight();

                if (side === 'right') {
                    sy = 0;
                    x = canvas.width + Math.random() * 200;
                } else {
                    sy = 39;
                    x = Math.random() * -200;
                }

                switch (wave[j].type) {
                    case 'soldier':
                        type = 'soldier';
                        sWidth = 24;
                        sHeight = 39;
                        sx = 24;
                        width = 24;
                        height = 39;
                        y = Math.random() * 545 + 15;
                        speed = Math.random() * 1.5 + 1.5;
                        life = 10;
                        power = 1;
                        points = 100;
                        break;
                    case 'commando':
                        type = 'commando';
                        sWidth = 24;
                        sHeight = 39;
                        sx = 24;
                        width = 24;
                        height = 39;
                        y = Math.random() * 545 + 15;
                        speed = Math.random() * 1.5 + 0.5;
                        life = 30;
                        power = 2;
                        points = 500;
                        break;
                    case 'boss':
                        type = 'boss';
                        sWidth = 70;
                        sHeight = 62;
                        sx = 70;
                        sy = 0;
                        width = 70;
                        height = 62;
                        y = Math.random() * 500 + 15;
                        x = canvas.width + 50;
                        side = 'right';
                        speed = 0.75;
                        life = 200;
                        power = 5;
                        points = 5000;
                        break;
                }
                enemiesAnimations.push({
                    type: IM.getInstance('img/sprite' + wave[j].type.charAt(0).toUpperCase() + wave[j].type.substring(1).toLowerCase())
                });
                enemiesAnimations[i].type.animation = new IIG.Animation({
                    sWidth: sWidth,
                    sHeight: sHeight,
                    sx: sx,
                    sy: sy,
                    alternate: true
                });
                enemies.push({
                    type: type,
                    image: enemiesAnimations[i].type,
                    width: width,
                    height: height,
                    x: x,
                    y: y,
                    side: side,
                    speed: speed,
                    life: life,
                    power: power,
                    points: points,
                    direction: 'up',
                    die: false
                });

            }
        }
    },
    leftOrRight: function(enemy) {
        random = Math.random();
        if (random < 0.5) {
            return 'left';
        } else {
            return 'right';
        }
    }
};