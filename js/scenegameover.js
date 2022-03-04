class SceneGameOver {
    /**
     * Create an instance of Scene game over
     * @param {ServiceManager} pServiceManager
     */
    constructor(pServiceManager) {
        this.serviceManager = pServiceManager
    }

    /**
     * Load the scene
     */
    load() {
        this.title = "GAME OVER";
        this.home = "Hit Enter to back Home";
    }

    /**
     * Handle when a key is released
     * @param {KeyboardEvent.code} pCode
     */
    keyUp(pCode) {
        if (pCode === "Enter") {
            this.serviceManager.startGame = false;
            this.serviceManager.gameOver = false
        }
    }


    /**
     * Draw thw scene
     * @param {CanvasRenderingContext2D} pCtx - The context used to draw in the canvas
     */
    draw(pCtx) {
        this.serviceManager.background.draw(pCtx);
        pCtx.fillStyle = "#71C937";

        // Title
        pCtx.font = "55px Kenney Future";
        let titleW = pCtx.measureText(this.title).width;
        pCtx.fillText(this.title, (getGameWidth() - titleW) / 2, 80);

        // Start
        let img = this.serviceManager.assetLoader.getImage("vault/images/Sprites/PNG/playerShip3_green.png");
        pCtx.font = "35px Kenney Future Narrow";
        let startW = pCtx.measureText(this.home).width;
        pCtx.fillText(this.home, (getGameWidth() - startW) / 2, 320);
        pCtx.drawImage(img, (getGameWidth() - startW) / 2 - img.width - 20, 280);
        pCtx.save();
        let x = (getGameWidth() - startW) / 2 + startW + img.width + 8;
        let y = 343;
        pCtx.translate(x, y);
        pCtx.rotate(-Math.PI);
        pCtx.translate(-x, -y);
        pCtx.drawImage(img, x, y);
        pCtx.restore()

    }
}