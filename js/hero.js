class Hero {
    /**
     * Create an instance of Hero
     * @param {Sprite} pSprite
     * @param {Sprite} pIcon
     * @param {Number} pX
     * @param {Number} pY
     * @param {Number} pSpeed
     */
    constructor(pSprite, pIcon, pX = 0, pY = 0, pSpeed = 0) {
        this.x = pX;
        this.y = pY;
        this.vx = 0;
        this.vy = 0;
        this.died = false;
        /** @type Sprite*/
        this.sprite = pSprite;
        this.icon = pIcon;
        this.lives = 5;
        this.maxEnergie = 20;
        this.energie = this.maxEnergie;
        this.sprite.x = pX;
        this.sprite.y = pY;
        this.speed = pSpeed;
        this.up = false;
        this.right = false;
        this.bottom = false;
        this.left = false;
        this.shoot = false;
        this.shootTimer = 0;
        this.shootTimerMax = .1;
        this.pull = false
    }

    /**
     * Load the hero
     * @param {ServiceManager} pServiceManager
     */
    load(pServiceManager) {
        this.serviceManager = pServiceManager;
    }

    /**
     * Handle when a key is down
     * @param {KeyboardEvent.code} pCode
     */
    keyDown(pCode) {
        switch (pCode) {
            case 'ArrowUp':
                this.up = true;
                break;
            case 'ArrowRight':
                this.right = true;
                break;
            case 'ArrowDown':
                this.bottom = true;
                break;
            case 'ArrowLeft':
                this.left = true;
                break;
            case 'Space':
                this.shoot = true;
                break;
            case 'KeyX':
                this.pull = true;
                break;
        }
    }

    /**
     * Handle when a key is released
     * @param {KeyboardEvent.code} pCode
     */
    keyUp(pCode) {
        switch (pCode) {
            case 'ArrowUp':
                this.up = false;
                break;
            case 'ArrowRight':
                this.right = false;
                break;
            case 'ArrowDown':
                this.bottom = false;
                break;
            case 'ArrowLeft':
                this.left = false;
                break;
            case 'Space':
                this.shoot = false;
                this.shootTimer = 0;
                break;
            case 'KeyX':
                this.pull = false;
                break;
        }
    }


    /**
     * Inflict damage to the when fired on
     */
    hurt() {
        this.energie -= 1;
        if (this.energie <= 0) {
            if (this.lives > 1) {
                this.lives--;
                this.energie = this.maxEnergie
            } else
                this.died = true

        }
    }

    /**
     * Update the hero state
     * @param {Number} dt - Deta time
     */
    update(dt) {
        if (this.died) {
            this.serviceManager.gameOver = true;
            this.serviceManager.startGame = false;
            return;
        }
        // Move the player
        this.vx = 0;
        this.vy = 0;
        if (this.up && this.y > 0)
            this.vy = -this.speed;
        if (this.right && this.x + this.sprite.img.width < getGameWidth())
            this.vx = this.speed;
        if (this.bottom && this.y + this.sprite.img.height < getGameHeight())
            this.vy = this.speed;
        if (this.left && this.x > 0)
            this.vx = -this.speed;
        if (this.shoot) {
            this.shootTimer -= dt;
            if (this.shootTimer <= 0) {
                this.serviceManager.bulletManager.add(this.x + this.sprite.img.width, this.y + this.sprite.img.height / 2, 6, 0, 'HERO');
                this.shootTimer = this.shootTimerMax;
            }
        }
        if (this.pull && !this.serviceManager.bulletManager.hasSpecial())
            this.serviceManager.bulletManager.add(this.x + this.sprite.img.width, this.y + this.sprite.img.height / 2, 6, 0, 'HERO', "PULL");

        this.x += this.vx * 60 * dt;
        this.y += this.vy * 60 * dt;
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }

    /**
     * Show how much lives is left to he hero
     * @param {CanvasRenderingContext2D} pCtx - The context used to draw in the canvas
     */
    drawLives(pCtx) {
        let imgX = this.serviceManager.assetLoader.getImage("vault/images/Sprites/PNG/UI/numeralX.png");
        pCtx.drawImage(imgX, this.icon.x + this.icon.img.width + 5, this.icon.y + 5);
        let imgLife = this.serviceManager.assetLoader.getImage("vault/images/Sprites/PNG/UI/numeral" + this.lives + ".png");
        pCtx.drawImage(imgLife, this.icon.x + this.icon.img.width + imgX.width + 10, this.icon.y + 5)

    }

    /**
     * Draw the hero
     * @param {CanvasRenderingContext2D} pCtx - The context used to draw in the canvas
     */
    draw(pCtx) {
        this.drawLives(pCtx);
        this.icon.draw(pCtx);
        if (!this.died) {
            this.sprite.draw(pCtx);
        }

    }


}
