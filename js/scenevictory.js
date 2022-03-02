class SceneVictory {
    /**
     * Create an instance of Scene Victory
     * @param {ServiceManager} pServiceManager
     */
    constructor(pServiceManager) {
        this.serviceManager = pServiceManager
    }

    /**
     * Load the scene
     */
    load() {
        this.title = "YOU WON !!!";
        this.thanks = "Thanks for playing";
        this.home = "Hit Enter to back Home";


    }

    /**
     * Handle when a key is released
     * @param {KeyboardEvent.code} pCode
     */
    keyUp(pCode) {
        if (pCode === "Enter") {
            this.serviceManager.startGame = false
            this.serviceManager.victory=false
        }
    }

    /**
     * Update the scene
     * @param {Number} dt - Delta time
     */
    update(dt) {

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

        // Author
        pCtx.font = "35px Kenney Future Narrow";
        let authorW = pCtx.measureText(this.thanks).width;
        pCtx.fillText(this.thanks, (getGameWidth() - authorW) / 2, 160);

        // Start
        let img = this.serviceManager.assetLoader.getImage("vault/images/Sprites/PNG/playerShip3_green.png");
        pCtx.font = "35px Kenney Future Narrow";
        let homeW = pCtx.measureText(this.home).width;
        pCtx.fillText(this.home, (getGameWidth() - homeW) / 2, 320);
        pCtx.drawImage(img, (getGameWidth() - homeW) / 2 - img.width - 20, 280);
        pCtx.save();
        let x = (getGameWidth() - homeW) / 2 + homeW + img.width + 8;
        let y = 343;
        pCtx.translate(x, y);
        pCtx.rotate(-Math.PI);
        pCtx.translate(-x, -y);
        pCtx.drawImage(img, x, y);
        pCtx.restore()

    }
}