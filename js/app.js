// Enemies our player must avoid
let Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;

    this.sprite = 'images/enemy-bug.png';
};
// Variables applied to each of our instances go here,
// we've provided one for you to get started

// The image/sprite for our enemies, this uses
// a helper we've provided to easily load images


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    if (this.x < 5) {
        this.x += this.speed * dt;
    }
    else {
        this.x = -1;
    }

};
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.

// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 20);
};



let allEnemies = [];





class Player {
    constructor() {
        this.x = 2;
        this.y = 5;
        this.level = 0;
        this.score = 0;
        this.lives = 3;
        this.sprite = 'images/char-pink-girl.png';
    }


    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 10);
    }
}
let player = null;

Player.prototype.handleInput = function (direction) {
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
};

Player.prototype.update = function (dt) {
    for (let enemy of allEnemies) {

        if (enemy.y === player.y
            &&
            (enemy.x > player.x - 0.8 &&
                enemy.x < player.x + 0.8)) {
            player.x = 2;
            player.y = 5;
            player.lives -= 1;
        }

    }

    if (player.y === 0) {
        player.x = 2;
        player.y = 5;
        player.level += 1;
    }

    
};




// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// New Hero object

// Init allEnemies array
// For each enemy create and push new Enemy object into above array

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

let Gem = function (x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
};

Gem.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101 + 10, this.y * 83 + 25, 80, 101);
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
let allGems = [];

function addGem() {
    const gem = new Gem(getRandomX(), getRandomY(), getRandomGem());
    allGems.push(gem);

}



Gem.prototype.update = function () {
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

Gem.prototype.destroy = function () {

    const index = allGems.indexOf(this)

    if (index > -1) {
        allGems.splice(index, 1)
    }


}

// add lives

let Life = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Heart.png';
};

Life.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101 + 10, this.y * 83 + 25, 80, 101);
};

const life1 = new Life(0, 0);
const life2 = new Life(1, 0);
const life3 = new Life(2, 0);