var score = 0;

var objScoreBar = {
    render: function() {
        context.font = "normal 15pt calabri";
        context.fillStyle = "#FFF";
        context.fillText("Score : " + score, 300, 15);
        
    },
    update: function(points) {
        score += points;
    }
};