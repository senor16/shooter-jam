class SceneGame {
    /**
     * Create an instance of SceneGame
     * @param {AssetLoader} pAssetLoader
     */
    constructor(pAssetLoader) {
        this.assetLoader = pAssetLoader
    }

    /**
     * Initialise the scene
     */
    load() {
        this.backgroundImage = this.assetLoader.getImage("vault/images/Backgrounds/back.png");
        this.background = new Background(this.backgroundImage, 2);
        let heroSpr = new Sprite(assetLoader.getImage("vault/images/Sprites/PNG/playerShip3_green.png"));
        let heroY = getGameHeight() / 2 - heroSpr.img.height / 2;
        this.hero = new Hero(heroSpr, 80, heroY, 2)
    }

    /**
     * Handle when a key is down
     * @param {KeyboardEvent.code} pCode
     */
    keyDown(pCode) {
        this.hero.keyDown(pCode)
    }

    /**
     * Handle when a key is released
     * @param {KeyboardEvent.code} pCode
     */
    keyUp(pCode) {
        this.hero.keyUp(pCode)
    }

    /**
     * Update the scene
     * @param {Number} dt - Delta time
     */
    update(dt) {
        this.background.update(dt);
        this.hero.update(dt)
    }

    /**
     * Draw thw scene
     * @param {CanvasRenderingContext2D} pCtx - The context used to draw in the canvas
     */
    draw(pCtx) {
        this.background.draw(pCtx);
        this.hero.draw(pCtx)
    }
}
