let assetLoader;
let start;
let sceneGame;


/**
 * Start the game
 */
function startGame() {
    start = true;
    sceneGame = new SceneGame(assetLoader);
    sceneGame.load()

}

/**
 * Handle when a key is down
 * @param {KeyboardEvent} pKey
 */
function keyDown(pKey) {
    pKey.preventDefault();
    // console.log("Key down "  + pKey.code)
    sceneGame.keyDown(pKey.code)
}

/**
 * Handle when a key is released
 * @param {KeyboardEvent} pKey
 */
function keyUp(pKey) {
    pKey.preventDefault();
    // console.log("Key up " + pKey.code)
    sceneGame.keyUp(pKey.code)
}

// The game loop

/**
 * Here is where initialisations are done
 */
function load() {
    start = false;
    // Load images
    assetLoader = new AssetLoader();
    assetLoader.addImage("vault/images/Backgrounds/back.png");
    assetLoader.addImage("vault/images/Sprites/PNG/Lasers/laserGreen04.png");
    assetLoader.addImage("vault/images/Sprites/PNG/playerShip3_green.png");
    // Load audio
    assetLoader.addAudio("vault/audio/sfx/sfx_laser1.ogg")
    assetLoader.start(startGame);


    document.onkeydown = keyDown;
    document.onkeyup = keyUp
}

/**
 * Update the game state
 * @param {number} dt - The delta time
 */
function update(dt) {
    if (!start) {
        return
    }
    sceneGame.update(dt)

}

/**
 * Draw to the screen
 * @param {CanvasRenderingContext2D} pCtx - The context used to draw in the canvas
 */
function draw(pCtx) {
    if (!start) {
        // Show a progress bar while assets are loading
        let ratio = assetLoader.getRatio();
        pCtx.fillStyle = "rgb(255,255,255)";
        pCtx.fillRect(0, 0, 100, 20);
        pCtx.fillStyle = "rgb(119,255,64)";
        pCtx.fillRect(0, 0, 100 * ratio, 20);
        return
    }
    sceneGame.draw(pCtx)
}
