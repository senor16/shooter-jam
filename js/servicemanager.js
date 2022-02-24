class ServiceManager{
    constructor(){
        this.bulletManager = null
        this.assetLoader = null
        this.hero=null
    }

    /**
     * Set bullet manager
     * @param {BulletManager} pBulletManager
     */
    set setBulletManager(pBulletManager){
        this.bulletManager = pBulletManager
    }

    /**
     * Set asset loader
     * @param {AssetLoader} pAssetLoader
     */
    set setAssetLoader(pAssetLoader){
        this.assetLoader = pAssetLoader
    }

}