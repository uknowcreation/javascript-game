var keyboard = {
    up: false,
    right: false,
    bottom: false,
    left: false,
    echap:false,
    space: false
};

document.addEventListener('keydown', function(evt) {
    keyboard.up = evt.keyCode === 90 ? true : keyboard.up;
    keyboard.right = evt.keyCode === 68 ? true : keyboard.right;
    keyboard.left = evt.keyCode === 81 ? true : keyboard.left;
    keyboard.bottom = evt.keyCode === 83 ? true : keyboard.bottom;
    keyboard.space = evt.keyCode === 32 ? true : keyboard.space;
    keyboard.echap = evt.keyCode === 27 ? true : keyboard.echap;
}, false);

document.addEventListener('keyup', function(evt) {
    keyboard.up = evt.keyCode === 90 ? false : keyboard.up;
    keyboard.right = evt.keyCode === 68 ? false : keyboard.right;
    keyboard.left = evt.keyCode === 81 ? false : keyboard.left;
    keyboard.bottom = evt.keyCode === 83 ? false : keyboard.bottom;
    keyboard.space = evt.keyCode === 32 ? false : keyboard.space;
    keyboard.echap = evt.keyCode === 27 ? false : keyboard.echap;
}, false);