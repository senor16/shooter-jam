class Bullet {
    /**
     * Create a bullet
     * @param {Sprite} pSprite
     * @param {String} pType
     * @param {Number} pX
     * @param {Number} pY
     * @param {Number} pVx - Horizontal speed
     * @param {Number} pVy - Vertical speed
     */
    constructor(pSprite, pType, pX, pY, pVx, pVy) {
        this.sprite = pSprite;
        this.sprite.x=pX
        this.sprite.y=pY
        this.vx = pVx;
        this.vy = pVy;
        this.x = pX;
        this.y = pY
    }

    /**
     * Update the bullet
     * @param {Number} dt - Delta time
     */
    update(dt) {
        this.x += this.vx;
        this.y += this.vy;
        this.sprite.x = this.x;
        this.sprite.y = this.y
    }

    /**
     * Draw the bullet
     * @param {CanvasRenderingContext2D} pCtx - The context used to draw in the canvas
     */
    draw(pCtx) {
        this.sprite.draw(pCtx)
    }
}


class BulletManager {
    /**
     * Create an instance of bullet manager
     */
    constructor() {
        this.bulletList = [];
        /** @type Audio */
        this.sfxShoot = null
    }

    /**
     * Load the service manager
     * @param {ServiceManager} pServiceManager
     */
    load(pServiceManager) {
        this.serviceManager = pServiceManager;
        this.sfxShoot = this.serviceManager.assetLoader.getAudio("vault/audio/sfx/sfx_laser1.ogg")
    }

    /**
     * Add a bullet
     * @param {Number} pX
     * @param {Number} pY
     * @param {Number} pVx
     * @param {Number} pVy
     * @param {String} pType
     */
    add(pX, pY, pVx, pVy, pType) {
        let sprite = null;
        let bullet = null;
        switch (pType) {
            case 'FRIENDLY':
                sprite = new Sprite(this.serviceManager.assetLoader.getImage("vault/images/Sprites/PNG/Lasers/laserGreen04.png"));
                bullet = new Bullet(sprite, 'FRIENDLY', pX, pY - sprite.img.height / 2, pVx, pVy);
                this.bulletList.push(bullet);
                this.sfxShoot.currentTime = 0;
                this.sfxShoot.play();
                break;
            case "ENEMY":
                sprite = new Sprite(this.serviceManager.assetLoader.getImage("vault/images/Sprites/PNG/Lasers/laserGreen14.png"));
                bullet = new Bullet(sprite, 'ENEMY', pX, pY - sprite.img.height / 2, pVx, pVy);
                this.bulletList.push(bullet);
                break;
        }

    }

    /**
     * Remove a bullet
     * @param {Bullet} pBullet
     */
    remove(pBullet) {
        let index = this.bulletList.indexOf(pBullet);
        this.bulletList.splice(index, 1)
    }

    /**
     * Update the bullet manager
     * @param {Number} dt - Delta time
     */
    update(dt) {
        for (let i = this.bulletList.length - 1; i >= 0; i--) {
            let bullet = this.bulletList[i];
            bullet.update(dt);
            // Remove a bullet when it is out of the screen
            if (bullet.x < 0 || bullet.x > getGameWidth() || bullet.y + bullet.sprite.img.height < 0 || bullet.y > getGameHeight()) {
                this.remove(bullet)
            }
        }
        console.log(this.bulletList.length)

    }

    /**
     * Draw the bullets
     * @param {CanvasRenderingContext2D} pCtx - The context used to draw in the canvas
     */
    draw(pCtx) {
        this.bulletList.forEach(bullet => {
            bullet.draw(pCtx)
        })
    }


}