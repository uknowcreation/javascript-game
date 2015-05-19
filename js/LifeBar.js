var objLifeBar = {
    render: function() {
        context.strokeRect(5, 5, 200, 10);
        context.fillStyle = "white";
        context.fillText("LIFE", 210, 15);

        if (perso.life < 25) {
            context.fillStyle = "red";
        } else {
            context.fillStyle = "white";
        }

        if (perso.life > 0) {
            context.fillRect(5, 5, perso.life * 2, 10);
        }
    }
};

var objLifeBarBoss = {
    render: function(objBoss) {
        context.strokeRect(540, 5, 200, 10);
        context.fillStyle = "white";
        context.fillText("BOSS", 745, 15);

        /*
         * @todo calculer le nombre de PV
         */
        if ((objBoss.life) <= 100) {
            context.fillStyle = "red";
        } else {
            context.fillStyle = "white";
        }

        if (objBoss.life > 0) {
            context.fillRect(540, 5, objBoss.life, 10);
        }

    }
};