// function to generate a random number between a min and max value 
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random()*(max-min+1)+min);

    return value;
};

// fight or skip function
var fightOrSkip = function() {
    // ask player if they'd like to fight or run
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
   
    // Conditional Recursive Function Call
    if (!promptFight){
        window.alert("You need to provide a valid answer!  Please try again.");
        return fightOrSkip();
    }
   
    promptFight = promptFight.toLowerCase();

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");

            // subtract money from playerInfo.money for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            console.log("playerInfo.money ", playerInfo.money);

            // return true if player wants to leave
            return true;
        }
    }
    return false;
}

// fight function
var fight = function(enemy) {

    // keep track of who goes first
    var isPlayerTurn = true;
    if (Math.random() > .5) {
        isPlayerTurn = false;
    }

    while (playerInfo.health > 0 && enemy.health > 0) {
        // check if it IS the players turn and then subtract the damage from the player's robot 
        if (isPlayerTurn) {
            console.log("It is " + playerInfo.name + "'s turn!");
          
            if (fightOrSkip()){
                // if true, leave by breaking the loop
                break;
            }
            
            // generate random damage value based on players attack power
            var damage = randomNumber(playerInfo.attack-3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");

            // check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");
                
                // award player money for winning
                playerInfo.money = playerInfo.money + 20;

                break;
            } else {
                    window.alert(enemy.name + " still has " + enemy.health + " health left.");
                }  
        } // end of players turn
        else {  
            // it is NOT the players turn, then subtract the damage from the enemy robot
            console.log("It is " + enemy.name + "'s turn!");
            // generate random damage value based on players attack power
            var damage = randomNumber(enemy.attack-3, enemy.attack);
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

            // check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                break;
            } else {
                    window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
                }
        } // end of enemies turn

        // switch the turn order for the next round
        isPlayerTurn = !isPlayerTurn;

    } //end of while loop
}; //end of fight function

// function to start a new game
var startGame = function() {

    //reset player stats
    playerInfo.reset();
  
    for (var i=0; i < enemyInfo.length; i++){
        // let player know waht round they are in, remember that arrays start at 0 so it needs a 1 added to it
        if (playerInfo.health>0){
            window.alert("Welcome to Robot Gladiators!  Round " + (i+1));
             // pick new enemy to fight based on the index of the enemy.names array
            var pickedEnemyObj=enemyInfo[i];
            // reset enemy.health before starting new fight - 40 to 60
           pickedEnemyObj.health = randomNumber(40,60);
            // pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
            fight(pickedEnemyObj);

            // if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length-1){
                // ask if player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the shop before the next round?");

                // if yes, take them to the shop() function
                if (storeConfirm) {
                    shop();
                }
            }
        } else {
            window.alert("You have lost your robot in battle!  Game Over!");
            break;
        }     
    }
    // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
};

// function to end the entire game
var endGame = function() {
window.alert("The game has ended.  Let's see how you did!")

    // Let's check the high score from local storage and test it for null
    var highScore = localStorage.getItem("highscore");
    highScore = highScore || 0; // falsy value gets set to 0, otherwise truthy value is used
    
    // Let's check to see if the player has the high score
    if (playerInfo.money > highScore){
        // set a new high score in local storage
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);
        window.alert("Congratulations, You have the new High Score!  $" + playerInfo.money);
    } else {
        window.alert("Sorry,  Your score of $" + playerInfo.money + " did not beat the current High Score of  $" + highScore)
    }

    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would  you like to play again?");

    if (playAgainConfirm){
        // restart game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators!  Come back soon");
    }
}

// shop function
var shop = function () {
    // ask player what they would like to do
    var shopOptionPrompt = window.prompt("Please enter '1' to Refill your Health, '2' to Upgrade your Attack power, or '3' to Leave.");

shopOptionPrompt = parseInt(shopOptionPrompt);
    // use switch to carry our the action
    switch(shopOptionPrompt) {
        case 1:
           playerInfo.refillHealth();
           break;

        case 2:
            playerInfo.upgradeAttack();
            break;

        case 3:
            window.alert("Leaving the store.");
            
            // do nothing, so the function will end
            break;

        default:
            window.alert("You did not pick a valid option.  Try again.");
            
            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
}

// function to set name 
var getPlayerName = function() {
    var name = "";

    while (!name) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
};

// define global game variables/objects - initial values
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7){
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >=7){
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10,14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10,14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10,14)
    }
];

console.log(enemyInfo);
console.log(enemyInfo[0]);
console.log(enemyInfo[0].name);
console.log(enemyInfo[0]['attack']);

// start the game when the page loads
startGame();



