class SceneGame {
    /**
     * Create an instance of SceneGame
     * @param {ServiceManager} pServiceManager
     */
    constructor(pServiceManager) {
        this.serviceManager = pServiceManager
    }

    /**
     * Initialise the scene
     */
    load() {
        // Load bullet manager
        this.serviceManager.setBulletManager = new BulletManager();
        this.serviceManager.bulletManager.load(this.serviceManager);

        // Set the background
        let backgroundImage = this.serviceManager.assetLoader.getImage("vault/images/Backgrounds/back.png");
        this.serviceManager.setBackground = new Background(backgroundImage, 1);

        // Load hero
        let heroIcon = new Sprite(this.serviceManager.assetLoader.getImage("vault/images/Sprites/PNG/UI/playerLife3_green.png"), 25, 25);
        let heroSpr = new Sprite(this.serviceManager.assetLoader.getImage("vault/images/Sprites/PNG/playerShip3_green.png"));
        let heroY = getGameHeight() / 2 - heroSpr.img.height / 2;
        this.serviceManager.setHero = new Hero(heroSpr, heroIcon, 5, heroY, 4);
        this.serviceManager.hero.load(this.serviceManager);

        // Load the waves
        this.serviceManager.setWaveManager = new WaveManager();
        this.serviceManager.waveManager.load(this.serviceManager);

        let imgRow = this.serviceManager.assetLoader.getImage("vault/images/Sprites/PNG/Enemies/enemyGreen1.png");
        let imgColumn = this.serviceManager.assetLoader.getImage("vault/images/Sprites/PNG/Enemies/enemyGreen2.png");
        let imgCascade = this.serviceManager.assetLoader.getImage("vault/images/Sprites/PNG/Enemies/enemyGreen3.png");
        let wave1 = new Wave(getGameWidth(), getGameWidth() + 100, 10, .4, 6, imgRow, 'CASUAL', "ROW");
        let wave2 = new Wave(getGameWidth() * 1.5 + wave1.startDistance + imgRow.width * wave1.count, getGameWidth() + 100, imgRow.height * 2, .4, 6, imgRow, 'CASUAL', "ROW");
        let wave3 = new Wave(getGameWidth() * 1.5 + wave2.startDistance + imgRow.width * wave2.count, getGameWidth() + 100, imgRow.height * 4, .4, 6, imgRow, 'CASUAL', 'ROW');
        let wave4 = new Wave(getGameWidth() * 1.5 + wave3.startDistance + imgRow.width * wave3.count, getGameWidth() + 100, 4, .4, 6, imgColumn, 'CASUAL', 'COLUMN');
        let wave5 = new Wave(getGameWidth() * 1.5 + wave4.startDistance + imgCascade.width * wave4.count, getGameWidth() + 100, 10, .4, 6, imgCascade, 'CASUAL', 'CASCADE');
        let wave6 = new Wave(getGameWidth() * 1.5 + wave5.startDistance + imgCascade.width * wave5.count, getGameWidth() + 100, 4, .4, 12, imgColumn, 'CASUAL', 'COLUMN');
        let wave7 = new Wave(getGameWidth() * 1.5 + wave6.startDistance + imgColumn.width * wave6.count, getGameWidth() + 100, 10, .4, 12, imgCascade, 'CASUAL', 'CASCADE');
        let wave8 = new Wave(getGameWidth() * 1.5 + wave7.startDistance + imgCascade.width * wave7.count, getGameWidth() + 100, 4, .4, 18, imgColumn, 'CASUAL', 'COLUMN');
        let wave9 = new Wave(getGameWidth() * 1.5 + wave8.startDistance + imgColumn.width * wave8.count, getGameWidth() + 100, imgRow.height * 4, .4, 10, imgRow, 'CASUAL', 'ROW');
        let wave10 = new Wave(getGameWidth() * 1.5 + wave9.startDistance + imgRow.width * wave9.count, getGameWidth() + 100, 4, .4, 30, imgColumn, 'CASUAL', 'COLUMN');
        let imgBoss = this.serviceManager.assetLoader.getImage("vault/images/Sprites/PNG/Enemies/enemyGreen4.png");
        let waveBoss = new Wave(getGameWidth() * 1.5 + wave10.startDistance + imgRow.width * wave10.count / 1.5, getGameWidth() + 100, getGameHeight() / 2 - imgBoss.height / 2, .4, 1, imgBoss, 'BOSS', 'ROW');

        this.serviceManager.waveManager.add(wave1);
        this.serviceManager.waveManager.add(wave2);
        this.serviceManager.waveManager.add(wave3);
        this.serviceManager.waveManager.add(wave4);
        this.serviceManager.waveManager.add(wave5);
        this.serviceManager.waveManager.add(wave6);
        this.serviceManager.waveManager.add(wave7);
        this.serviceManager.waveManager.add(wave8);
        this.serviceManager.waveManager.add(wave9);
        this.serviceManager.waveManager.add(wave10);
        this.serviceManager.waveManager.add(waveBoss);


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
        this.serviceManager.hero.draw(pCtx);
        this.serviceManager.bulletManager.draw(pCtx);

    }
}
