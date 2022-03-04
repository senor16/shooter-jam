class Sprite {
    /**
     * Create an instance of sprite
     * @param {Image} pImg - Sprite image
     * @param {Number} pX - x coordinate
     * @param {Number} pY - y coordinate
     */
    constructor(pImg, pX = 0, pY = 0) {
        this.x = pX;
        this.y = pY;
        /** @type Image*/
        this.img = pImg;
        this.currentFrame = 0;
        this.hasTileSheet = false;
        this.tileW = 0;
        this.tileH = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.animations = [];
        this.currentAnimation = null;
        this.currentFrameInAnimation = 0;
        this.frameTimer = 0;
    }


    /**
     * Update the sprite state
     * @param {Number} dt - Delta time
     */
    update(dt) {
        if (this.currentAnimation != null) {
            this.frameTimer += dt;
            if (this.frameTimer >= this.currentAnimation.speed) {
                this.frameTimer = 0;
                this.currentFrameInAnimation++;
                if (this.currentFrameInAnimation >= this.currentAnimation.frames.length) {
                    if (this.currentAnimation.loop) {
                        this.currentFrameInAnimation = 0;
                    } else {
                        this.currentFrameInAnimation = this.currentAnimation.frames.length - 1;
                        this.currentAnimation.end = true
                    }
                }
                this.currentFrame = this.currentAnimation.frames[this.currentFrameInAnimation];
            }
        }
    }

    /**
     * Draw the sprite
     * @param {CanvasRenderingContext2D} pCtx - The context used to draw in the canvas
     */
    draw(pCtx) {

        if (this.hasTileSheet) {
            let sx, sy, c, l;
            c = this.img.width / this.tileW;
            sy = Math.floor((this.currentFrame - 1) / c);
            sx = (this.currentFrame - 1) % c;
            pCtx.drawImage(this.img, sx * this.tileW, sy * this.tileH, this.tileW, this.tileH, Math.floor(this.x), Math.floor(this.y), this.tileW * this.scaleX, this.tileH * this.scaleY)
        } else {
            pCtx.drawImage(this.img, Math.floor(this.x), Math.floor(this.y));
        }

    }
}
