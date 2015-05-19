var projectilesBoss = [];
var collisionRateboss = 0;
var rateOfFire = 0;
var objProjectileBoss = {
    init: function() {
        projectileBoss = IM.getInstance('img/projectileboss');
        projectileBoss.animation = new IIG.Animation({
            sWidth: 50,
            sHeight: 24,
            sx: 0,
            sy: 0,
            alternate: true
        });
    },
    update: function() {
        //        console.log('updateProjectile');
        for (var i = 0; i < projectilesBoss.length; i++) {
            projectilesBoss[i].life++;

            if (projectilesBoss[i].x > perso.x)
            {
                angle = Math.atan2(perso.y - projectilesBoss[i].y, perso.x - projectilesBoss[i].x);
                projectilesBoss[i].x += Math.cos(angle) * projectilesBoss[i].speed;
                projectilesBoss[i].y += Math.sin(angle) * projectilesBoss[i].speed;
            } else {
                projectilesBoss[i].x -= projectilesBoss[i].speed;
            }
            if (projectilesBoss[i].x < 0) {
                projectilesBoss.image = IM.killInstance(projectilesBoss.image);
                projectilesBoss.splice(i, 1);
            }

            beCollided = collide(projectilesBoss[i], perso);

            if (projectilesBoss[i] && projectilesBoss[i].life === 200)
            {
                projectilesBoss.image = IM.killInstance(projectilesBoss.image);
                projectilesBoss.splice(i, 1);
            }

            if (beCollided) {
                collided = true;
                perso.life -= 10;
                projectilesBoss.image = IM.killInstance(projectilesBoss.image);
                projectilesBoss.splice(i, 1);
                collisionRateboss++;

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

                    if (perso.life <= 0) {
                        setTimeout(function() {
                            endGame(false);
                        }, 3000);
                    }
                }
            }

        }
    }
    ,
    render: function() {
        for (var i = 0; i < projectilesBoss.length; i++) {
            IM.drawImage(context, projectilesBoss[i].image, projectilesBoss[i].x, projectilesBoss[i].y);
        }


    },
    add: function(enemyBoss) {
        projectilesBoss.push({
            life: 0,
            image: projectileBoss,
            x: enemyBoss.x - 40,
            y: enemyBoss.y + 30,
            width: 50,
            height: 24,
            speed: 4
        });
    }
};