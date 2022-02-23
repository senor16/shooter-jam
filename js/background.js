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

    update(dt) {
        this.x -= this.speed;
        this.distance += this.speed;
        if (this.x <= -this.img.width)
            this.x = 0
    }

    draw(pCtx) {
        pCtx.drawImage(this.img, this.x, 0);
        pCtx.drawImage(this.img, this.x + this.img.width, 0)
    }
}