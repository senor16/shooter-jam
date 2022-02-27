class Hero {
    /**
     * Create an instance of Hero
     * @param {Sprite} pSprite
     * @param {Number} pX
     * @param {Number} pY
     * @param {Number} pSpeed
     */
    constructor(pSprite, pX = 0, pY = 0, pSpeed = 0) {
        this.x = pX;
        this.y = pY;
        this.vx = 0;
        this.vy = 0;
        this.died = false;
        /** @type Sprite*/
        this.sprite = pSprite;
        this.lives = 50;
        this.sprite.x = pX;
        this.sprite.y = pY;
        this.speed = pSpeed;
        this.up = false;
        this.right = false;
        this.bottom = false;
        this.left = false;
        this.shoot = false;
        this.shootTimer = 0;
        this.shootTimerMax = .5;

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
        }
    }


    /**
     * Inflict damage to the when fired on
     */
    hurt() {
        this.lives -= 1;
        if (this.lives <= 0) {
            this.died = true
        }
    }

    /**
     * Update the hero state
     * @param {Number} dt - Deta time
     */
    update(dt) {
        if (this.died)
            return;
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

        this.x += this.vx * 60 * dt;
        this.y += this.vy * 60 * dt;
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }


    /**
     * Draw the hero
     * @param {CanvasRenderingContext2D} pCtx - The context used to draw in the canvas
     */
    draw(pCtx) {
        if (this.died)
            return;
        this.sprite.draw(pCtx);
        pCtx.fillText(this.lives, this.x + this.sprite.img.width + 10, this.y + 20)

    }


}
