let assetLoader;
let start;
let sceneGame;

/**
 * Start the game
 */
function startGame() {
    start = true
    sceneGame = new SceneGame(assetLoader)
    sceneGame.load()

}

// The game loop

/**
 * Here is where initialisations are done
 */
function load() {
    start = false;
    assetLoader = new AssetLoader();
    assetLoader.addImage("vault/images/Backgrounds/back.png")
    assetLoader.addImage("vault/images/Sprites/PNG/playerShip3_green.png")
    assetLoader.start(startGame)
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
