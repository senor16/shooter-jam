class SceneGame {
    /**
     * Create an instance of SceneGame
     * @param {AssetLoader} pAssetLoader
     */
    constructor(pAssetLoader) {
        this.serviceManager = new ServiceManager();
        this.serviceManager.setBulletManager = new BulletManager();
        this.serviceManager.setAssetLoader = pAssetLoader;

        let backgroundImage = this.serviceManager.assetLoader.getImage("vault/images/Backgrounds/back.png");
        this.serviceManager.setBackground = new Background(backgroundImage, 2);

        let heroSpr = new Sprite(this.serviceManager.assetLoader.getImage("vault/images/Sprites/PNG/playerShip3_green.png"));
        let heroY = getGameHeight() / 2 - heroSpr.img.height / 2;
        this.serviceManager.setHero = new Hero(heroSpr, 5, heroY, 2);

        this.serviceManager.setWaveManager = new WaveManager();
        let wave = new Wave(400, getGameWidth() + 100, 40, 1, 5, 'CASUAL');
        this.serviceManager.waveManager.add(wave)
    }

    /**
     * Initialise the scene
     */
    load() {
        this.serviceManager.waveManager.load(this.serviceManager);
        this.serviceManager.hero.load(this.serviceManager);
        this.serviceManager.bulletManager.load(this.serviceManager)

    }

    /**
     * Handle when a key is down
     * @param {KeyboardEvent.code} pCode
     */
    keyDown(pCode) {
        this.serviceManager.hero.keyDown(pCode)
    }

    /**
     * Handle when a key is released
     * @param {KeyboardEvent.code} pCode
     */
    keyUp(pCode) {
        this.serviceManager.hero.keyUp(pCode)
    }

    /**
     * Update the scene
     * @param {Number} dt - Delta time
     */
    update(dt) {
        this.serviceManager.background.update(dt);
        this.serviceManager.hero.update(dt);
        this.serviceManager.bulletManager.update(dt);
        this.serviceManager.waveManager.update(dt)
    }

    /**
     * Draw thw scene
     * @param {CanvasRenderingContext2D} pCtx - The context used to draw in the canvas
     */
    draw(pCtx) {
        this.serviceManager.background.draw(pCtx);
        this.serviceManager.waveManager.draw(pCtx);
        this.serviceManager.bulletManager.draw(pCtx);
        this.serviceManager.hero.draw(pCtx);

    }
}
