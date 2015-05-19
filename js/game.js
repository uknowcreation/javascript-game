var paused = false;

function startGame() {
    localStorage['pseudo'] = document.getElementById("pseudo").value;

    document.getElementById("lancer").style.visibility = 'hidden';
    document.getElementById("lancer").blur();
    document.getElementById("psgame").style.visibility = 'hidden';
    document.getElementById("psgame").blur();
    document.getElementById("c").style.visibility = 'visible';
    playsound.play();

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (function() {
            return window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function(callback, element) {
                        window.setTimeout(callback, 1000 / 60);
                    };
        })();
    }

    canvas = document.querySelector('#c');
    context = canvas.getContext('2d');

    IM = new IIG.ImageManager();
    IM.add('img/spritePerso.png');
    IM.add('img/persodead.png');
    IM.add('img/spriteSoldier.png');
    IM.add('img/soldierdead.png');
    IM.add('img/spriteCommando.png');
    IM.add('img/commandodead.png');
    IM.add('img/spriteBoss.png');
    IM.add('img/spriteBossShoot.png');
    IM.add('img/xplodeboss.png');
    IM.add('img/spriteProjectile.png');
    IM.add('img/projectileboss.png');
    IM.add('img/xplode.png');
    IM.add('img/tiles/tiles1.png');
    IM.add('img/tiles/tiles2.png');
    IM.add('img/tiles/tiles3.png');
    IM.add('img/tiles/tiles4.png');
    IM.add('img/life.png');

    IM.loadAll(init);
}

function endGame(success) {
    paused = true;
    bossfinal.stop();
    playsound.stop();
    setTimeout(function() {
        xplodebosssound.stop();
    }, 1500);

    if (success) {
        document.getElementById("c").style.display = 'none';

        //Création du tableau de score à enregistrer
        arrayScore = new Array;
        arrayScore[0] = localStorage['pseudo'];
        arrayScore[1] = score;

        /* FONCTION DE GESTION DES SCORES A CREER */
        if (localStorage['score1'] === "") {
            // cas aucun score stocké
            localStorage['score1'] = JSON.stringify(arrayScore);
        }
        else if (localStorage['score2'] === "") {
            // 2eme partie
            localStorage['score2'] = localStorage['score1'];
            localStorage['score1'] = JSON.stringify(arrayScore);
        }
        else if (localStorage['score3'] === "") {
            // 3eme partie
            localStorage['score3'] = localStorage['score2'];
            localStorage['score2'] = localStorage['score1'];
            localStorage['score1'] = JSON.stringify(arrayScore);
        }
        else if (localStorage['score4'] === "") {
            // 4eme partie
            localStorage['score4'] = localStorage['score3'];
            localStorage['score3'] = localStorage['score2'];
            localStorage['score2'] = localStorage['score1'];
            localStorage['score1'] = JSON.stringify(arrayScore);
        }
        else if (localStorage['score5'] === "") {
            // 5eme partie
            localStorage['score5'] = localStorage['score4'];
            localStorage['score4'] = localStorage['score3'];
            localStorage['score3'] = localStorage['score2'];
            localStorage['score2'] = localStorage['score1'];
            localStorage['score1'] = JSON.stringify(arrayScore);
        } else {
            for (i = 0; i < 5; i++) {
                scoreLoop = "score" + (i + 1);
                scoreSave = JSON.parse(localStorage[scoreLoop]);
                scoreSave = scoreSave[1];

                if (scoreSave < score) {
                    localStorage[scoreLoop] = JSON.stringify(arrayScore);
                    i = 5;
                }
            }
        }
    }
    else {
        document.getElementById("c").style.display = 'none';
    }

    for (i = 0; i < 5; i++) {
        scoreLoop = "score" + (i + 1);
        tdScore = document.createElement('td');
        tdPlayer = document.createElement('td');
        tr = document.getElementById(scoreLoop);
        tr.appendChild(tdPlayer);
        tr.appendChild(tdScore);

        if (localStorage[scoreLoop] !== "") {
            playerAndScoreSave = JSON.parse(localStorage[scoreLoop]);
            playerSave = playerAndScoreSave[0];
            scoreSave = playerAndScoreSave[1];
            tdScore.innerHTML = scoreSave;
            tdPlayer.innerHTML = playerSave;
        }
    }

    document.getElementById("scoreInfo").style.visibility = 'visible';
    sortTable('scoreInfo',1,DESC)
}

function init() {

    test = new Array;
    test['a'] = 'b';

    //Initialisation du LocalStorage
    if (!localStorage["score1"]) {
        for (var i = 0; i < 5; i++) {
            scoreLoop = "score" + (i + 1);
            localStorage[scoreLoop] = "";
        }
    }
    objMap.init();
    objPerso.init();
    objEnemy.init();
    objProjectile.init();
    objProjectileBoss.init();

    run();
}

function update() {
//    console.log('updateGame');
    if (!paused)
    {
        IM.update();
        objPerso.update();
        objEnemy.update();
        objProjectile.update();
        objProjectileBoss.update();
        objMap.update();

        if (keyboard.echap) {

            paused = true;
            keyboard.echap = false;
        }
    }
    else
    {
        if (keyboard.echap) {
            paused = false;
            keyboard.echap = false;
        }
    }
}


function render() {
//    console.log('renderGame');
    context.clearRect(0, 0, canvas.width, canvas.height);

    objMap.render();
    objPerso.render();
    objLifeBar.render();
    objScoreBar.render();
    objEnemy.render();
    objProjectile.render();
    objProjectileBoss.render();

}

function run() {
//    console.log('runGame');
    IM.update();
    update();
    render();
    requestAnimationFrame(run);
}