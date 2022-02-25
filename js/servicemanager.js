class ServiceManager {
    constructor() {
        /** @type BulletManager */
        this.bulletManager = null;
        /** @type AssetLoader */
        this.assetLoader = null;
        /** @type Hero */
        this.hero = null
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
     * set Hero
     * @param {Hero} pHero
     */
    set setHero(pHero) {
        this.hero = pHero
    }


}