let allEnemies = [];
let allGems = [];
let player = null;

// Create enemy class

class Enemy {

    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }

    // Enemy movement
    update(dt) {
        if (this.x < 5) {
            this.x += this.speed * dt;
        }
        else {
            this.x = -1;
        }
    }

    // Draw the enemy on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 20);
    }
};


// Create player class
class Player {

    constructor() {
        this.x = 2;
        this.y = 5;
        this.score = 0;
        this.lives = 3;
        this.sprite = 'images/char-pink-girl.png';
    }

    // Draw the player on the screen

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 10);

        ctx.font = "18px Arial";
        ctx.fillText("Score: " + this.score, 10, 40);
    }

    // Player movements
    handleInput(direction) {
        switch (direction) {
            case 'up':
                if (this.y > 0) {
                    this.y -= 1;
                }
                break;
            case 'down':
                if (this.y < 5) {
                    this.y += 1;
                }
                break;
            case 'left':
                if (this.x > 0) {
                    this.x -= 1;
                }
                break;
            case 'right':
                if (this.x < 4) {
                    this.x += 1;
                }
                break;
        }
    }

    update(dt) {
        //if player collides with enemy
        for (let enemy of allEnemies) {

            if (enemy.y === this.y
                &&
                (enemy.x > this.x - 0.8 &&
                    enemy.x < this.x + 0.8)) {
                this.x = 2;
                this.y = 5;
                this.lives -= 1;
            }

        }
        //if player gets to the water
        if (this.y === 0) {
            this.x = 2;
            this.y = 5;
            this.score += 25;
        }

    }

    isDead() {
        return this.lives < 1;
    }

}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// add Gems as extra Items to collect

class Gem {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 101 + 10, this.y * 83 + 25, 80, 101);
    };

    update() {
        for (let gem of allGems) {

            if (gem.y === player.y
                &&
                (gem.x > player.x - 0.8 &&
                    gem.x < player.x + 0.8)) {

                gem.destroy();
                player.score += 50;
                console.log(player.score)

                addGem()

            }
        }
    }

    destroy() {

        const index = allGems.indexOf(this)

        if (index > -1) {
            allGems.splice(index, 1)
        }
    }
};

function getRandom(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

function getRandomX() {
    return getRandom([0, 1, 2, 3, 4]);
}

function getRandomY() {
    return getRandom([1, 2, 3]);
}

function getRandomGem() {
    return getRandom(['images/Gem Orange.png', 'images/Gem Blue.png', 'images/Gem Green.png']);
}

function addGem() {
    const gem = new Gem(getRandomX(), getRandomY(), getRandomGem());
    allGems.push(gem);
}

// add lives

class Life {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/Heart.png';
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 101 + 10, this.y * 83 + 25, 80, 101);
    }
};

const life1 = new Life(0, 0);
const life2 = new Life(1, 0);
const life3 = new Life(2, 0);