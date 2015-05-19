var map = [];
var heartLife;
var count = 0;

var objMap = {
    init: function() {
        tile1 = IM.getInstance('img/tiles/tiles1');
        tile2 = IM.getInstance('img/tiles/tiles2');
        tile3 = IM.getInstance('img/tiles/tiles3');
        tile4 = IM.getInstance('img/tiles/tiles4');
        heart = IM.getInstance('img/life');

        var nbX = 25;
        var nbY = 19;

        for (var i = 0; i < nbX; i++) {
            for (var j = 0; j < nbY; j++) {
                if (j === 0) {
                    map.push({
                        image: tile4,
                        x: i * tile4.width,
                        y: j * tile4.height
                    });
                }
                if (j === nbY - 1) {
                    map.push({
                        image: tile3,
                        x: i * tile3.width,
                        y: j * tile3.height - 8
                    });
                }



                if (j !== 0 && j !== nbY - 1) {
                    map.push({
                        image: tile1,
                        x: i * tile1.width,
                        y: j * tile1.height
                    });
                }
            }
            map.push({
                image: tile2,
                x: Math.random() * canvas.width - 32,
                y: Math.random() * 500 + 32
            });
        }
        heartLife = {
            image: heart,
            x: Math.random() * canvas.width - 32,
            y: Math.random() * 500 + 32,
            width: 30,
            height: 30,
            pop: true
        };



    },
    render: function() {
        count++;
        for (var i = 0; i < map.length; i++) {
            context.drawImage(map[i].image.data, map[i].x, map[i].y);
        }

        if (count > 1000) {
            context.drawImage(heartLife.image.data, heartLife.x, heartLife.y);
        }
    },
    update: function() {
        if (count === 500) {
            heartLife.pop = true;
            heartLife.x = Math.random() * canvas.width - 32;
            heartLife.y = Math.random() * 500 + 32;
        }

        beCollided = collide(perso, heartLife);
        if (beCollided && heartLife.pop === true) {
            heartLife.pop = false;
            count = 0;
            if (perso.life <= 95){
                perso.life += 5;
            } else {
                perso.life = 100;
            }
        }

    }
};