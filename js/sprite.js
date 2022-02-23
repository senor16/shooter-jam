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
        this.img = pImg;
        this.currentFrame = 0;
        this.hasTileSheet = false
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
     * Set the tilesheet of the sprite
     * @param {Number} pW - Width
     * @param {Number} pH - Height
     */
    setTileSheet(pW = 0, pH = 0){
        this.hasTileSheet = true;
        this.tileW = pW;
        this.tileH = pH;
    }

    /**
     * Set x coordinate
     * @param {Number} pX
     */
    set setX(pX) {
        this.x = Math.floor(pX)
    }

    /**
     * Set y coordinate
     * @param {Number} pY
     */
    set setY(pY) {
        this.y = Math.floor(pY)
    }

    /**
     * Modify the scale value
     * @param {Number} pX - x axis
     * @param {Number} pY - y axis
     */
    setScale(pX, pY) {
        this.scaleX = pX;
        this.scaleY = pY;
    }


    /**
     * Add an animation
     * @param {String} pName - Animation name
     * @param {Array} pFrames - Tiles constituting the animation Ex: [0,1,4,3]
     * @param {Number} pSpeed - Delay to show the next frame
     * @param {Boolean} pLoop - Specify whether the animation can loop
     */
    addAnimation(pName, pFrames, pSpeed, pLoop) {
        this.animations[pName] = {
            name: pName,
            frames: pFrames,
            speed: pSpeed,
            loop: pLoop,
            end: false
        };
    }

    /**
     * Start an animation
     * @param {String} pName - Name of the animation to start
     */
    startAnimation(pName) {
        if (this.currentAnimation != null && this.currentAnimation.name === pName) {
            return;
        }
        this.currentAnimation = this.animations[pName];
        this.currentFrameInAnimation = 0;
        this.currentFrame = this.currentAnimation.frames[this.currentFrameInAnimation];
        this.frameTimer = 0;
        this.currentAnimation.end = false
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
            pCtx.drawImage(this.img, sx * this.tileW, sy * this.tileH, this.tileW, this.tileH, this.x, this.y, this.tileW * this.scaleX, this.tileH * this.scaleY)
        } else {
            pCtx.drawImage(this.img, this.x, this.y);
        }
    }
}
