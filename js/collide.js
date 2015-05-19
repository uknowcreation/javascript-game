collide = function(a, b) {
    if (a === undefined || b === undefined)
        return false;

    if (typeof a.width === "undefined" || typeof a.height === "undefined" || typeof b.width === "undefined" || typeof b.height === "undefined")
        return false;

    return !(b.x >= a.x + a.width // Trop à droite
            || b.x + b.width <= a.x // Trop à gauche
            || b.y >= a.y + a.height // Trop en bas
            || b.y + b.height <= a.y) // Trop en haut
};