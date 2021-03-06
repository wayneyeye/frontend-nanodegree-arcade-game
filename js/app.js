// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // the Enemy initializes at the leftmost and can start from any row between 
    // 2 - 3 randomly    
    this.x = getRandomInt(-20,-1)*120;
    this.y = getRandomInt(1, 3)*83-25;
    // Enemy with varies speed
    this.spd = getRandomInt(100,250)/100;

    // return this;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt){
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 700){
        this.x=this.x+dt*200*this.spd;
    }
    else {
            this.x = getRandomInt(-20,-1)*120;
            this.y = getRandomInt(1, 3)*83-25;
            // Enemy with varies speed
            this.spd = getRandomInt(100,250)/100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Collision detection within the enemy object
Enemy.prototype.checkCollision = function() {
    if (Math.abs(player.y-this.y)<=30&&Math.abs(player.x-this.x)<=40){
        // console.log('Collision!');
        player.resFlag=true;
    };
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-cat-girl.png';
    // the player start from the middle bottom grid    
    this.x = 203;
    this.y = 5*83-10;
    this.resFlag=false;
    this.score=0;
    this.collision=0;
    // return this;
};

// Update the players's position, required method for game
// handleInput()
Player.prototype.update = function(){
    if (this.resFlag){
        this.x=203;
        this.y=5*83-10;
        this.resFlag=false;
        this.collision+=1;
    };
//Check if win
    if (this.y<=20){
        this.x=203;
        this.y=5*83-10;
        this.resFlag=false;
        this.score+=1;
        // console.log(score);
    };
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    // console.log(this.x);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handles the input from the keyboard
Player.prototype.handleInput = function(keycmd) {
    var cmdMap = {
        'left': -101,
        'right': 101,
        'up': -83,
        'down': 83
    };
    if(keycmd == 'left'||keycmd=='right'){
        // console.log(this.x);
        this.x+=cmdMap[keycmd];
        if(this.x<0||this.x>505){
            this.x-=cmdMap[keycmd];
        }    
    };

    if(keycmd == 'up'||keycmd=='down'){
        // console.log(this.y);
        this.y=this.y+cmdMap[keycmd];
        if(this.y<-80||this.y>450){
            this.y-=cmdMap[keycmd];
        }    
    };
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
// Add multiple moving enemies
for(num = 1; num <=10; num++){
    allEnemies.push(new Enemy());    
}
// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
