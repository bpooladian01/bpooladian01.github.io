var number = 100;
var intervalId;
var correctGuesses = 0;
var incorrectGuesses = 0;
document.getElementById("something").style.display = "none"
$("#stop").on("click", stop);
$("#start").on("click", run);
function run() {
  clearInterval(intervalId);
  intervalId = setInterval(decrement, 1000);
  document.getElementById("something").style.display = "block"
}
function decrement() {
  number--;
  $("#instructions").html(number);
  if (number === 0) {
    stop();
    alert("Time Up!");
  }
}
function stop() {
  clearInterval(intervalId);
  number = 100; 
}



console.log(number)
