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
        this.sprite = pSprite;
        this.speed = pSpeed;
        this.up = false;
        this.right = false;
        this.bottom = false;
        this.left = false
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
        }
    }

    /**
     * Update the hero state
     * @param {Number} dt - Deta time
     */
    update(dt) {
        // Move the player
        this.vx = 0;
        this.vy = 0;
        if (this.up)
            this.vy = -this.speed;
        if (this.right)
            this.vx = this.speed;
        if (this.bottom)
            this.vy = this.speed;
        if (this.left && this.x - this.sprite.img.height > 0)
            this.vx = -this.speed;

        this.x += this.vx;
        this.y += this.vy;
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }


    /**
     * Draw the hero
     * @param {CanvasRenderingContext2D} pCtx - The context used to draw in the canvas
     */
    draw(pCtx) {
        pCtx.save();
        pCtx.translate(this.x, this.y);
        pCtx.rotate(Math.PI / 2);
        pCtx.translate(-this.x, -this.y);
        this.sprite.draw(pCtx);
        pCtx.restore()
    }


}
