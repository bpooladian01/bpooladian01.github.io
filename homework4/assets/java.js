var counter = 0;
$("#yourGuess").text(counter);
var wins = 0;
$("#totalWins").text(wins);
var losses = 0;
$("#totalLosses").text(losses);

var runGame = function () {

var targetNumber = Math.floor(Math.random() * 101) + 19;
$("#number-to-guess").text(targetNumber);

var crystal1 = Math.floor(Math.random() * 12) + 1;
$("#crystal1").on("click", function() {
counter += crystal1;
$("#yourGuess").text(counter);
if (counter === targetNumber) {
    alert("you win!");
    wins++;
    $("#totalWins").text(wins);
}
else if (counter >= targetNumber) {
    alert("you lose!");
    losses++;
    $("#totalLosses").text(losses);
}
});

var crystal2 = Math.floor(Math.random() * 12) + 1;
$("#crystal2").on("click", function() {
counter += crystal2;
$("#yourGuess").text(counter);
if (counter === targetNumber) {
    alert("you win!");
    wins++;
    $("#totalWins").text(wins);
}
else if (counter >= targetNumber) {
    alert("you lose!");
    losses++;
    $("#totalLosses").text(losses);
}
});

var crystal3 = Math.floor(Math.random() * 12) + 1;
$("#crystal3").on("click", function() {
counter += crystal3;
$("#yourGuess").text(counter);
if (counter === targetNumber) {
    alert("you win!");
    wins++;
    $("#totalWins").text(wins);
}
else if (counter >= targetNumber) {
    alert("you lose!");
    losses++;
    $("#totalLosses").text(losses);
}
});

var crystal4 = Math.floor(Math.random() * 12) + 1;
$("#crystal4").on("click", function() {
counter += crystal4;
$("#yourGuess").text(counter);
if (counter === targetNumber) {
    alert("you win!");
    wins++;
    $("#totalWins").text(wins);
    resetGame();
}
else if (counter >= targetNumber) {
    alert("you lose!");
    losses++;
    $("#totalLosses").text(losses);
    rungame();
    console.log(counter)
}
});
}
runGame()