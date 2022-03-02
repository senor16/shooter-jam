class Enemy {
    /**
     * Create a new instance of ennemy
     * @param {Sprite} pSprite
     * @param {String} pType - Enemy type
     * @param {Number} pX - X position
     * @param {Number} pY - Y position
     * @param {Number} pDelay - Delay for the enemy to come alive
     */
    constructor(pSprite, pType, pX, pY, pDelay) {
        this.x = pX;
        this.y = pY;
        this.type = pType;
        this.sprite = pSprite;
        this.sprite.x = pX;
        this.sprite.y = pY;
        this.pendingDelay = pDelay;
        this.timer = 0;
        this.shooTimerMax = 1;
        this.died = false;
        this.active = false;
        this.appeared = false;
        /** @type ServiceManager*/
        this.serviceManager = null;
        switch (pType) {
            case 'CASUAL':
                this.vx = -3;
                this.vy = 0;
                this.maxEnergie = 4;
                this.energie = this.maxEnergie;
                break;
            case 'BOSS':
                this.vx = -3;
                this.vy = -3;
                this.maxEnergie = 50;
                this.energie = this.maxEnergie;
                this.shooTimerMax = 1;
                break;
        }
    }

    /**
     * Init the Hero
     * @param pServiceManager
     */
    load(pServiceManager) {
        this.serviceManager = pServiceManager
    }

    /**
     * Inflict damage to an enemy when fired on
     */
    hurt() {
        this.energie -= 1;
        if (this.energie <= 0) {
            this.died = true
        }
    }

    /**
     * Inflict tiny damage to an enemy when fired on
     */
    hurtSlowly() {
        this.energie -= .1;
        if (this.energie <= 0) {
            this.died = true
        }
    }

    /**
     * Update the wave
     * @param {Number} dt - Delta time
     */
    update(dt) {
        if (!this.active) {
            this.timer += dt;
            if (this.timer >= this.pendingDelay) {
                this.active = true;
                this.timer = 0
            }
            return
        }

        /**
         *  Specificity of the boss
         */
        if (this.type === "BOSS" && this.appeared) {
            // Make the boss move in diagonal
            if (this.x < getGameWidth() / 2 || this.x > getGameWidth() - this.sprite.img.width) {
                this.vx = -this.vx;
                if (this.x < getGameWidth() / 2)
                    this.x = getGameWidth() / 2;
                if (this.x > getGameWidth() - this.sprite.img.width)
                    this.x = getGameWidth() - this.sprite.img.width
            }
            if (this.y < 0 || this.y > getGameHeight() - this.sprite.img.height) {
                this.vy = -this.vy;
                if (this.y < 0)
                    this.y = 0;
                if (this.y > getGameHeight() - this.sprite.img.height)
                    this.y = getGameHeight() - this.sprite.img.height
            }

        }

        this.timer -= dt;
        this.x += this.vx * 60 * dt;
        this.y += this.vy * 60 * dt;
        this.sprite.x = this.x;
        this.sprite.y = this.y;

        // Check if the enemy is visible on the screen
        if (!this.appeared && this.x + this.sprite.img.width <= getGameWidth())
            this.appeared = true;

        // Shoot at the hero
        if (this.timer <= 0) {
            this.timer = this.shooTimerMax;
            if (this.type === "BOSS") {
                for (let i = 0; i < 361; i += 10) {
                    let vx = 10 * Math.cos(i);
                    let vy = 10 * Math.sin(i);
                    this.serviceManager.bulletManager.add(this.x, this.y + this.sprite.img.height / 2, vx, vy, "ENEMY")
                }
            } else {
                let angl = angle(this.x, this.y, this.serviceManager.hero.x + this.serviceManager.hero.sprite.img.width / 2, this.serviceManager.hero.y);
                let vx = 10 * Math.cos(angl);
                let vy = 10 * Math.sin(angl);
                this.serviceManager.bulletManager.add(this.x, this.y + this.sprite.img.height / 2, vx, vy, "ENEMY")
            }
        }
    }

    /**
     * Draw the enemy
     * @param {CanvasRenderingContext2D} pCtx - The context used to draw in the canvas
     */
    draw(pCtx) {
        if (!this.active)
            return;
        this.sprite.draw(pCtx);
        // Draw Energie level of the boss
        if (this.type === "BOSS") {
            pCtx.strokeStyle = "#65804F";
            pCtx.strokeRect(this.x, this.y + this.sprite.img.height + 10, this.sprite.img.width * .9, 10);
            pCtx.fillStyle = "#65804F";
            let width = this.sprite.img.width * (this.energie / this.maxEnergie);
            pCtx.fillRect(this.x + this.sprite.img.width * .9 - width * .9, this.y + this.sprite.img.height + 10, width * .9, 10)
        }
    }
}

class Wave {
    /**
     * Create an instance of wave
     * @param {Number} pStartDistance - X position to start the wave
     * @param {Number} pX - X Position to start the enemies
     * @param {Number} pY - Y Position to start the enemies
     * @param {Number} pDelay - Interval between each enemy
     * @param {Number} pCount - Number of enemies in the wave
     * @param {Image} pImage - Enemy image
     * @param {String} pType - Type of those enemies
     * @param {String} pForm - Form of the wave
     */
    constructor(pStartDistance, pX, pY, pDelay, pCount, pImage, pType, pForm) {
        this.form = pForm;
        this.enemyList = [];
        this.started = false;
        this.x = pX;
        this.y = pY;
        this.delay = pDelay;
        /**@type ServiceManager */
        this.serviceManager = null;
        this.count = pCount;
        this.type = pType;
        this.startDistance = pStartDistance;
        this.image = pImage;
    }

    /**
     * Init the wave
     * @param pServiceManager
     */
    load(pServiceManager) {
        this.serviceManager = pServiceManager
    }

    /**
     * Add an enemy to the wave
     * @param {Enemy} pEnemy
     */
    add(pEnemy) {
        this.enemyList.push(pEnemy)
    }

    /**
     * Remove an enemy from the wave
     * @param {Enemy} pEnemy
     */
    remove(pEnemy) {
        let index = this.enemyList.indexOf(pEnemy);
        this.enemyList.splice(index, 1)
    }

    /**
     * Determine whether a wave is empty
     * @returns {boolean}
     */
    empty() {
        return this.enemyList.length === 0
    }

    /**
     * Update the wave
     * @param {Number} dt - Delta time
     */
    update(dt) {
        for (let i = this.enemyList.length - 1; i >= 0; i--) {
            let enemy = this.enemyList[i];
            enemy.update(dt);
            if (isColliding(enemy.x, enemy.y, enemy.sprite.img.width, enemy.sprite.img.height, this.serviceManager.hero.x, this.serviceManager.hero.y, this.serviceManager.hero.sprite.img.width, this.serviceManager.hero.sprite.img.height)) {
                enemy.hurt();
                this.serviceManager.hero.hurt()
            }
            // Remove the enemy when he died
            if (enemy.died) {
                this.remove(enemy)
            }

            if (enemy.x + enemy.sprite.img.width < 0) {
                this.remove(enemy)
            }
        }
        // console.log(this.enemyList.length)
    }

    /**
     * Draw the wave
     * @param {CanvasRenderingContext2D} pCtx - The context used to draw in the canvas
     */
    draw(pCtx) {
        this.enemyList.forEach(enemy => {
            enemy.draw(pCtx)
        })
    }
}

class WaveManager {
    /**
     * Create an instance of wave manager
     */
    constructor() {
        this.waveList = [];
        /** @type Wave*/
        this.currentWave = null
    }

    /**
     * Init the wave manager
     * @param pServiceManager
     */
    load(pServiceManager) {
        this.serviceManager = pServiceManager
    }

    /**
     * Add a wave to the list
     */
    add(pWave) {
        pWave.load(this.serviceManager);
        this.waveList.push(pWave)
    }

    /**
     * Remove a wave
     * @param {Wave} pWave
     */
    remove(pWave) {
        let index = this.waveList.indexOf(pWave);
        this.waveList.splice(index, 1)
    }

    /**
     * Start a ave
     * @param {Wave} pWave
     */
    startWave(pWave) {
        pWave.started = true;
        if (this.currentWave !== null) {
            this.stopWave(this.currentWave);
        }
        let y = pWave.y, x = pWave.x, col = 0;
        for (let i = 0; i < pWave.count; i++) {
            let sprite = new Sprite(pWave.image);
            switch (pWave.type) {
                case 'CASUAL':
                    /**@type Enemy*/
                    let enemy = null;
                    switch (pWave.form) {
                        case 'ROW':
                            enemy = new Enemy(sprite, pWave.type, pWave.x, pWave.y, pWave.delay * i);
                            break;
                        case "CASCADE":
                            if (y + sprite.img.height > getGameHeight()) {
                                y = pWave.y;
                            }
                            enemy = new Enemy(sprite, pWave.type, x, y, pWave.delay / 1.5 * i);
                            y += sprite.img.height + 2;
                            break;
                        case "COLUMN":
                            if (y + sprite.img.height > getGameHeight()) {
                                y = pWave.y;
                                col++;
                            }
                            enemy = new Enemy(sprite, pWave.type, pWave.x, y, pWave.delay * col);
                            y += sprite.img.height + 4;
                            break;
                    }
                    if (enemy !== null) {
                        enemy.load(this.serviceManager);
                        pWave.add(enemy);
                    }
                    break;
                case 'BOSS':
                    let boss = new Enemy(sprite, pWave.type, pWave.x, pWave.y, 0);
                    boss.load(this.serviceManager);
                    pWave.add(boss);
                    break;
            }
        }
        this.currentWave = pWave

    }

    /**
     * Stop a wave
     * @param {Wave} pWave
     */
    stopWave(pWave) {
        this.remove(pWave)
    }

    /**
     * Update the wave manager
     * @param {Number} dt - Delta time
     */
    update(dt) {
        for (let i = this.waveList.length - 1; i >= 0; i--) {
            let wave = this.waveList[i];
            if (this.serviceManager.background.distance >= wave.startDistance && !wave.started) {
                this.startWave(wave)
            }
            if (this.waveList.length > 0 && this.currentWave !== null && this.currentWave.empty() && (i === 1 || i === this.currentWave.enemyList.length)) {
                wave.x += getGameWidth() / 2;
                this.startWave(wave)
            }
        }

        if (this.currentWave !== null)
            this.currentWave.update(dt);
        if(this.waveList.length<=0){
            this.serviceManager.gameWon=true
        }
    }

    /**
     *Draw the wave
     * @param {CanvasRenderingContext2D} pCtx - The context used to draw in the canvas
     */
    draw(pCtx) {
        if (this.currentWave !== null)
            this.currentWave.draw(pCtx)
    }
}