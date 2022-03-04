let canvas = document.getElementById("canvas");
let context = canvas.getContext('2d');
let oldTime = 0;


/**
 * Run the game
 * @param time
 */
function run(time) {
    requestAnimationFrame(run);
    let dt = (time - oldTime) / 1000;
    oldTime = time;
    update(dt);
    context.clearRect(0, 0, canvas.width, canvas.height);
    draw(context);
}

/**
 * Initialise the game
 */
function init() {
    context.imageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;
    load();
    requestAnimationFrame(run);
}

/**
 * Get the width of the canvas
 * @returns {Number}
 */
function getGameWidth() {
    return canvas.width
}

/**
 * Get the height of the canvas
 * @returns {Number}
 */
function getGameHeight() {
    return canvas.height
}

init();
