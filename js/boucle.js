var gamePause = false;

function GameLoop(){
    
    if(gamePause){
        update();
        render();
    }
};