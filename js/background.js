class Background {
    /**
     * Create an instance of backround
     * @param {Image} pImg - background image
     * @param {Number} pSpeed - speed
     */
    constructor(pImg, pSpeed) {
        this.img = pImg;
        this.speed = pSpeed;
        this.x = 0;
        this.distance = this.img.width
    }

    /**
     * Update the scrolling
     * @param {Number} dt - Delta time
     */
    update(dt) {
        this.x -= this.speed;
        this.distance += this.speed;
        if (this.x <= -this.img.width)
            this.x = 0
    }

    /**
     * Draw the background
     * @param {CanvasRenderingContext2D} pCtx - The context used to draw in the canvas
     */
    draw(pCtx) {
        pCtx.drawImage(this.img, this.x, 0);
        pCtx.drawImage(this.img, this.x + this.img.width, 0)
    }
}