class SceneHome {
    /**
     * Create an instance of SceneHome
     * @param {ServiceManager} pServiceManager
     */
    constructor(pServiceManager) {
        this.serviceManager = pServiceManager
    }

    /**
     * Load the scene
     */
    load() {
    }

    /**
     * Handle when a key is released
     * @param {KeyboardEvent.code} pCode
     */
    keyUp(pCode) {
        if (pCode === "Enter") {
            this.serviceManager.startGame = true
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
        pCtx.font = "55px Kenney Future";
        // Title
        let title = "SHOOTER JAM";
        let titleW = pCtx.measureText(title).width;
        pCtx.fillText(title, (getGameWidth() - titleW) / 2, 80);

        // Author
        pCtx.font = "35px Kenney Future Narrow";
        let author = "By Sesso Kosga";
        let authorW = pCtx.measureText(author).width;
        pCtx.fillText(author, (getGameWidth() - authorW) / 2, 160);

        pCtx.font = "20px Kenney Future Narrow";
        let email = "kosgasesso@gmail.com";
        let emailW = pCtx.measureText(email).width;
        pCtx.fillText(email, (getGameWidth() - emailW) / 2, 190);

        // Start
        pCtx.font = "35px Kenney Future Narrow";
        let start = "Hit Enter to start";
        let startW = pCtx.measureText(start).width;
        pCtx.fillText(start, (getGameWidth() - startW) / 2, 320);
        let img = this.serviceManager.assetLoader.getImage("vault/images/Sprites/PNG/playerShip3_green.png");
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