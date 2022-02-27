class Bullet {
    /**
     * Create a bullet
     * @param {Sprite} pSprite
     * @param {String} pType
     * @param {String} pSpecial - Special behavior of the bullet
     * @param {Number} pX
     * @param {Number} pY
     * @param {Number} pVx - Horizontal speed
     * @param {Number} pVy - Vertical speed
     */
    constructor(pSprite, pType, pX, pY, pVx, pVy, pSpecial = "DEFAULT") {
        this.sprite = pSprite;
        this.sprite.x = pX;
        this.sprite.y = pY;
        this.type = pType;
        this.vx = pVx;
        this.vy = pVy;
        this.x = pX;
        this.y = pY;
        this.special = pSpecial
    }

    /**
     * Update the bullet
     * @param {Number} dt - Delta time
     */
    update(dt) {
        this.x += this.vx * 60 * dt;
        this.y += this.vy * 60 * dt;
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
        this.sfxShoot = null;
        this.sfxHit = null
    }

    /**
     * Load the service manager
     * @param {ServiceManager} pServiceManager
     */
    load(pServiceManager) {
        this.serviceManager = pServiceManager;
        this.sfxShoot = this.serviceManager.assetLoader.getAudio("vault/audio/sfx/sfx_laser1.ogg");
        this.sfxHit = this.serviceManager.assetLoader.getAudio("vault/audio/sfx/explode_touch.wav")
    }

    /**
     * Add a bullet
     * @param {Number} pX
     * @param {Number} pY
     * @param {Number} pVx
     * @param {Number} pVy
     * @param {String} pType
     * @param {String} pSpecial - Special behavior of the bullet
     */
    add(pX, pY, pVx, pVy, pType, pSpecial = "DEFAULT") {
        let sprite = null;
        let bullet = null;
        switch (pType) {
            case 'HERO':
                if (pSpecial === "DEFAULT") {
                    sprite = new Sprite(this.serviceManager.assetLoader.getImage("vault/images/Sprites/PNG/Lasers/laserGreen04.png"));
                    bullet = new Bullet(sprite, pType, pX, pY - sprite.img.height / 2, pVx, pVy);
                    this.bulletList.push(bullet);
                    this.sfxShoot.currentTime = 0;
                    this.sfxShoot.play();
                }
                break;
            case "ENEMY":
                sprite = new Sprite(this.serviceManager.assetLoader.getImage("vault/images/Sprites/PNG/Lasers/laserGreen14.png"));
                bullet = new Bullet(sprite, pType, pX, pY - sprite.img.height / 2, pVx, pVy);
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

            // Check collision between the bullet an the enemies
            if (this.serviceManager.waveManager.currentWave !== null) {
                for (let i = this.serviceManager.waveManager.currentWave.enemyList.length - 1; i >= 0; i--) {
                    /** @type Enemy*/
                    let enemy = this.serviceManager.waveManager.currentWave.enemyList[i];
                    if (bullet.type === "HERO") {
                        if (isColliding(bullet.x, bullet.y, bullet.sprite.img.width, bullet.sprite.img.height, enemy.x, enemy.y, enemy.sprite.img.width, enemy.sprite.img.height)) {
                            enemy.hurt();
                            this.sfxHit.currentTime = 0;
                            this.sfxHit.play();
                            this.remove(bullet)
                        }
                    }
                }
            }
            // Check collision between the bullet and h=the hero
            if (bullet.type === "ENEMY") {
                if (isColliding(bullet.x, bullet.y, bullet.sprite.img.width, bullet.sprite.img.height, this.serviceManager.hero.x, this.serviceManager.hero.y, this.serviceManager.hero.sprite.img.width, this.serviceManager.hero.sprite.img.height)) {
                    this.serviceManager.hero.hurt();
                    this.sfxHit.currentTime = 0;
                    this.sfxHit.play();
                    this.remove(bullet)
                }
            }
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