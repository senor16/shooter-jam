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
        this.title = "SHOOTER JAM";
        this.author = "By Sesso Kosga";
        this.email = "kosgasesso@gmail.com";
        this.start = "Hit Enter to start";


    }

    /**
     * Handle when a key is released
     * @param {KeyboardEvent.code} pCode
     */
    keyUp(pCode) {
        if (pCode === "Enter") {
            this.serviceManager.startGame = true;
            this.serviceManager.sceneGame.load()
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

        // Author
        pCtx.font = "35px Kenney Future Narrow";
        let authorW = pCtx.measureText(this.author).width;
        pCtx.fillText(this.author, (getGameWidth() - authorW) / 2, 160);

        // Email
        pCtx.font = "20px Kenney Future Narrow";
        let emailW = pCtx.measureText(this.email).width;
        pCtx.fillText(this.email, (getGameWidth() - emailW) / 2, 190);

        // Start
        let img = this.serviceManager.assetLoader.getImage("vault/images/Sprites/PNG/playerShip3_green.png");
        pCtx.font = "35px Kenney Future Narrow";
        let startW = pCtx.measureText(this.start).width;
        pCtx.fillText(this.start, (getGameWidth() - startW) / 2, 320);
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