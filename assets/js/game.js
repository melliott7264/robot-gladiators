
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random()*(max-min+1)+min);

    return value;
};

// fight function
var fight = function(enemy) {

    while (playerInfo.health > 0 && enemy.health > 0) {

        // ask player if they'd like to fight or run
        var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
        // if player picks "skip" confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
                // subtract money from playerInfo.money for skipping
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerInfo.money ", playerInfo.money);
                break;
            }
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
    // if player is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
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
    var shopOptionPrompt = window.prompt("Would  you like to REFILL your health, UPGRADE your attack, or LEAVE the store?  Please enter one: 'REFILL', 'UPGRADE', OR 'LEAVE' to make a choice.");

    // use switch to carry our the action
    switch(shopOptionPrompt) {
        case "REFILL": // new case
        case "refill":
           playerInfo.refillHealth();
           break;

        case "UPGRADE": // new case
        case "upgrade":
            playerInfo.upgradeAttack();
            break;

        case "LEAVE": // new case    
        case "leave":
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

    while (name==="" || name===null) {
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
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >=7){
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

// start the game when the page loads
startGame();



