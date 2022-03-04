let assetLoader;
let start;
let sceneGame, sceneHome, sceneGameOver, sceneVictory;
let serviceManager;
let pause = false;


/**
 * Start the game
 */
function startGame() {
    start = true;
    sceneGame = new SceneGame(serviceManager);
    serviceManager.setSceneGame = sceneGame;
    sceneHome = new SceneHome(serviceManager);
    sceneGameOver = new SceneGameOver(serviceManager);
    sceneVictory = new SceneVictory(serviceManager);
    sceneGame.load();
    sceneGameOver.load();
    sceneHome.load();
    sceneVictory.load()

}

/**
 * Handle when a key is down
 * @param {KeyboardEvent} pKey
 */
function keyDown(pKey) {
    if (!pause) {
        pKey.preventDefault();
        // console.log("Key down "  + pKey.code)
        if (serviceManager.startGame && !pause)
            sceneGame.keyDown(pKey.code)
    }
}

/**
 * Handle when a key is released
 * @param {KeyboardEvent} pKey
 */
function keyUp(pKey) {

    pKey.preventDefault();
    // console.log("Key up " + pKey.code)
    if (serviceManager.gameOver) {
        sceneGameOver.keyUp(pKey.code)
    } else if (serviceManager.victory) {
        sceneVictory.keyUp(pKey.code)
    } else {
        if (serviceManager.startGame) {
            if (pKey.code === "Enter")
                pause = !pause;
            if (!pause)
                sceneGame.keyUp(pKey.code);
        } else
            sceneHome.keyUp(pKey.code);
    }
}

// The game loop

/**
 * Here is where initialisations are done
 */
function load() {
    assetLoader = new AssetLoader();
    serviceManager = new ServiceManager();
    serviceManager.setAssetLoader = assetLoader;
    start = false;
    // Load images
    assetLoader.addImage("vault/images/Backgrounds/back.png");
    assetLoader.addImage("vault/images/Sprites/PNG/Lasers/laserGreen04.png");
    assetLoader.addImage("vault/images/Sprites/PNG/playerShip3_green.png");
    assetLoader.addImage("vault/images/Sprites/PNG/Enemies/enemyGreen1.png");
    assetLoader.addImage("vault/images/Sprites/PNG/Enemies/enemyGreen2.png");
    assetLoader.addImage("vault/images/Sprites/PNG/Enemies/enemyGreen3.png");
    assetLoader.addImage("vault/images/Sprites/PNG/Enemies/enemyGreen4.png");
    assetLoader.addImage("vault/images/Sprites/PNG/Lasers/laserGreen15.png");
    assetLoader.addImage("vault/images/Sprites/PNG/Lasers/laserGreen16.png");
    assetLoader.addImage("vault/images/Sprites/PNG/UI/numeral1.png");
    assetLoader.addImage("vault/images/Sprites/PNG/UI/numeral2.png");
    assetLoader.addImage("vault/images/Sprites/PNG/UI/numeral3.png");
    assetLoader.addImage("vault/images/Sprites/PNG/UI/numeral4.png");
    assetLoader.addImage("vault/images/Sprites/PNG/UI/numeral5.png");
    assetLoader.addImage("vault/images/Sprites/PNG/UI/numeralX.png");
    assetLoader.addImage("vault/images/Sprites/PNG/UI/playerLife3_green.png");
    // Load audio
    assetLoader.addAudio("vault/audio/sfx/sfx_laser1.ogg");
    assetLoader.addAudio("vault/audio/sfx/explode_touch.wav");
    // Load Fonts
    assetLoader.addFont("Kenney Future", "vault/fonts/Kenney Future.ttf");
    assetLoader.addFont("Kenney Future Narrow", "vault/fonts/Kenney Future Narrow.ttf");
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
    if (!pause) {
        if (serviceManager.startGame)
            sceneGame.update(dt);
    }

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
        pCtx.fillStyle = "#71C937";
        pCtx.fillRect(0, 0, 100 * ratio, 20);
        return
    }
    if (serviceManager.gameOver) {
        sceneGameOver.draw(pCtx);
    } else if (serviceManager.victory) {
        sceneVictory.draw(pCtx)
    } else {
        if (serviceManager.startGame)
            sceneGame.draw(pCtx);
        else
            sceneHome.draw(pCtx)
    }

}

/**
 * Return the angle between two sprites
 * @param {number} x1 - x coordinates of the first sprite
 * @param {number} y1 - y coordinates of the first sprite
 * @param {number} x2 - x coordinates of the second sprite
 * @param {number} y2 - y coordinates of the second sprite
 * @returns {number}
 */
function angle(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1)
}

/**
 * Check whether to sprites are colliding
 * Sprite one
 * @param {number} x1 - x coordinates
 * @param {number} y1 - y coordinates
 * @param {number} w1 - width
 * @param {number} h1 - height
 * Sprite two
 * @param {number} x2 - x coordinates
 * @param {number} y2 - y coordinates
 * @param {number} w2 - width
 * @param {number} h2 - height
 * @returns {boolean}
 */
function isColliding(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 < x2 + w2 && x2 < x1 + h1 && y1 < y2 + h2 && y2 < y1 + h1
}

/**
 * Return the distance between two points
 * @param {number} x1 - x coordinates of the first sprite
 * @param {number} y1 - y coordinates of the first sprite
 * @param {number} x2 - x coordinates of the second sprite
 * @param {number} y2 - y coordinates of the second sprite
 * @returns {number}
 */
function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}