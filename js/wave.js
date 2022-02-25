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
        this.pendingDelay = pDelay;
        this.timer = 0;
        this.active = false;
        switch (pType) {
            case 'CASUAL':
                this.vx = -2;
                this.vy = 0;
                this.life = 2;
                break;
            case 'BOSS':
                this.vx = -4;
                this.vy = 0;
                this.life = 20;
                break;
        }
    }

    /**
     * Load the Enemy
     * @param {ServiceManager} pServiceManager
     */
    load(pServiceManager) {
        this.serviceManager = pServiceManager;
    }

    update(dt) {
        if (!this.active) {
            this.timer += dt;
            if (this.timer >= this.pendingDelay) {
                this.active = true
            }
            return
        }
        this.x += this.vx;
        this.y += this.vy;
        this.sprite.x = this.x;
        this.sprite.y = this.y
    }

    /**
     * Draw the enemy
     * @param {CanvasRenderingContext2D} pCtx - The context used to draw in the canvas
     */
    draw(pCtx) {
        if (!this.active)
            return;
        this.sprite.draw(pCtx)
    }
}

class Wave {
    /**
     * Create an instance of wave
     * @param {Number} pStartX - X position to start the wave
     * @param {Number} pX - X Position to start the enemies
     * @param {Number} pY - Y Position to start the enemies
     * @param {Number} pDelay - Interval between each enemy
     * @param {Number} pCount - Number of enemies in the wave
     * @param {String} pType - Type of those enemies
     * @param {String} pForm - Form of the wave
     * @param {Boolean} pCanStopScrolling - Specify whether the wave can stop scrolling
     */
    constructor(pStartX, pX, pY, pDelay, pCount, pType, pForm, pCanStopScrolling = false) {
        this.form = pForm;
        this.enemylist = [];
        this.started = false;
        this.x = pX;
        this.y = pY;
        this.delay = pDelay;
        this.count = pCount;
        this.type = pType;
        this.startX = pStartX;
        this.scroll = true;
        this.canStopScrolling = pCanStopScrolling
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
        this.enemylist.push(pEnemy)
    }

    /**
     * Remove an enemy from the wave
     * @param {Enemy} pEnemy
     */
    remove(pEnemy) {
        let index = this.enemylist.indexOf(pEnemy);
        this.enemylist.splice(index, 1)
    }

    /**
     * Check if the wave is empty
     * @return Boolean
     */
    isEmpty() {
        return this.enemylist.length === 0
    }

    /**
     * Update the wave
     * @param {Number} dt - Delta time
     */
    update(dt) {
        for (let i = this.enemylist.length - 1; i >= 0; i--) {
            let enemy = this.enemylist[i];
            enemy.update(dt);
            // Remove an enemy when his life jauge is gone
            if (enemy.life <= 0) {
                this.remove(enemy)
            }
        }
        // Stop scrolling the wave when all the enemies are active and visible on the screen
        if (this.canStopScrolling) {
            let lastEnemy = this.enemylist[this.enemylist.length - 1];
            if (this.scroll && lastEnemy.active && lastEnemy.x < getGameWidth() - lastEnemy.sprite.img.width * 2) {
                this.scroll = false;
                this.enemylist.forEach(enemy => {
                    enemy.vx = 0;
                    enemy.vy = 0
                })
            }
        }
    }

    /**
     * Draw the wave
     * @param {CanvasRenderingContext2D} pCtx - The context used to draw in the canvas
     */
    draw(pCtx) {
        this.enemylist.forEach(enemy => {
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
        if (this.currentWave !== null) {
            this.stopWave(this.currentWave);
        }
        let y = pWave.y, x = pWave.x, col = 0;
        for (let i = 0; i < pWave.count; i++) {
            switch (pWave.type) {
                case 'CASUAL':
                    let sprite = new Sprite(this.serviceManager.assetLoader.getImage("vault/images/Sprites/PNG/Enemies/enemyGreen1.png"), pWave.x, pWave.y);
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
                            y += sprite.img.height;
                            break;
                        case "COLUMN":
                            if (y + sprite.img.height > getGameHeight()) {
                                y = pWave.y;
                                col++;
                            }
                            enemy = new Enemy(sprite, pWave.type, pWave.x, y, pWave.delay * col);
                            y += sprite.img.height + 5;
                            break;
                    }

                    pWave.add(enemy);
                    break;
                case 'BOSS':
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
            if (this.serviceManager.background.distance >= wave.startX) {
                this.startWave(wave)
            }

        }
        if (this.currentWave !== null)
            this.currentWave.update(dt)
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