class SceneGame {
    /**
     * Create an instance of SceneGame
     * @param {AssetLoader} pAssetLoader
     */
    constructor(pAssetLoader) {
        this.assetLoader = pAssetLoader
    }

    load() {
        this.backgroundImage = this.assetLoader.getImage("vault/images/Backgrounds/back.png");
        this.background = new Background(this.backgroundImage, 2)

    }

    update(dt) {
        this.background.update(dt)
    }

    draw(pCtx) {
        this.background.draw(pCtx)
    }
}
