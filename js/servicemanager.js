class ServiceManager {
    /**
     * Create an instance of service manager
     */
    constructor() {
        /** @type BulletManager */
        this.bulletManager = null;
        /** @type AssetLoader */
        this.assetLoader = null;
        /** @type Hero */
        this.hero = null;
        /** @type Background*/
        this.background = null;
        /** @type WaveManager */
        this.waveManager = null;
        /**@type SceneGame*/
        this.sceneGame = null;
        this.victory = false;
        this.gameOver = false;
        this.startGame = false
    }

    /**
     * Set bullet manager
     * @param {BulletManager} pBulletManager
     */
    set setBulletManager(pBulletManager) {
        this.bulletManager = pBulletManager
    }

    /**
     * Set asset loader
     * @param {AssetLoader} pAssetLoader
     */
    set setAssetLoader(pAssetLoader) {
        this.assetLoader = pAssetLoader
    }

    /**
     * Set scene game
     * @param {SceneGame} pSceneGame
     */
    set setSceneGame(pSceneGame) {
        this.sceneGame = pSceneGame
    }

    /**
     * set Hero
     * @param {Hero} pHero
     */
    set setHero(pHero) {
        this.hero = pHero
    }

    /**
     * Set background
     * @param {Background} pBackground
     */
    set setBackground(pBackground) {
        this.background = pBackground
    }

    /**
     * set Wave manager
     * @param {WaveManager} pWaveManager
     */
    set setWaveManager(pWaveManager) {
        this.waveManager = pWaveManager
    }


}
