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

const enemyOne = new Enemy(-1, 1, 5);
const enemyTwo = new Enemy(-1, 2, 2);
const enemyThree = new Enemy(-1, 3, 1);
const allEnemies = [];
allEnemies.push(enemyOne, enemyTwo, enemyThree);



class Player {
    constructor() {
        this.x = 2;
        this.y = 5;
        this.sprite = 'images/char-pink-girl.png';
    }


    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 10);
    }
}
const player = new Player();

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
            (enemy.x  > player.x - 0.8 &&
                enemy.x < player.x + 0.8 )) {
            player.x = 2;
            player.y = 5;
        }

        if (this.y === 0) {
            console.log("Win");
        }
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
