var startButton = document.querySelector(".start-button")
var wordDiv = document.querySelector(".large-font-word-blanks")
var timerEl = document.getElementById("timer");
var wins= document.querySelector(".win");
var losses= document.querySelector(".lose");
var resetButton=document.querySelector(".reset-button")

var words = ["javascript", "boolean", "number", "array", "algorithm", "element", "object", "constructor"]
var blankArray = []
var wordchoice = "";
var wordLettersArray = [] //All the letters in the word
var secondsLeft;
var timerInterval;
var isWin = false;
var winCounter=0;
var loseCounter=0;

function init(){
  getWins();
  getLosses();

}

function startGame() {
  isWin = false;
  secondsLeft = 10;
  wordDiv.innerHTML = "";
  startButton.disabled = true;
  renderWordChoice()
  startTimer()

}

function renderWordChoice() {
  wordchoice = words[Math.floor(Math.random() * words.length)]
  wordLettersArray = wordchoice.toLowerCase().split("");
  for (i = 0; i < wordLettersArray.length; i++) {
    blankArray.push("_")
  }
  blankString = blankArray.join(" ")
  wordDiv.innerHTML = blankString
  console.log(wordchoice)
}

function startTimer() {
 timerInterval = setInterval(function() {
  secondsLeft--;
  timerEl.textContent = secondsLeft;
  if (timerInterval >= 0) {
    // Tests if win condition is met
    if (isWin && (secondsLeft > 0)) {
      // Clears interval and stops timer
      clearInterval(timerInterval);
      winGame();
    }
  }
  // Tests if time has run out
  if (secondsLeft === 0) {
    // Clears interval
    clearInterval(timerInterval);
    loseGame();
  }
}, 1000);
}

function checkLetter(letter) {
  for (i = 0; i < wordLettersArray.length; i++) {
    if (wordLettersArray[i] === letter) {
      blankArray[i] = letter;
      var arrayJoined = blankArray.join("");
      wordDiv.innerHTML = arrayJoined
    }
  }
}

function checkWins() {
  // If the word equals the blankLetters array when converted to string, set isWin to true
  if (wordchoice === blankArray.join("")) {
    // This value is used in the timer function to test if win condition is met
    isWin = true;
  }
}

// The winGame function is called when the win condition is met
function winGame() {
  wordDiv.innerHTML = "YOU WON!!!🏆 ";
  winCounter++
  startButton.disabled = false;
  setWins()
}

// The loseGame function is called when timer reaches 0
function loseGame() {
  wordDiv.textContent = "GAME OVER";
  loseCounter++
  startButton.disabled = false;
  setLosses()
}

function setWins(){
wins.textContent=winCounter;
localStorage.setItem("wins", winCounter);
}

function setLosses(){
  losses.textContent=loseCounter
localStorage.setItem("losses", loseCounter);
}

function getWins(){
  var storedWins=localStorage.getItem("wins");
  if (storedWins===null){
    wins.textContent=0;
  }else{
  wins.textContent=storedWins
}
}

function getLosses(){
  var storedLosses=localStorage.getItem("losses");
  if (storedLosses===null){
    losses.textContent=0;
  }else{
  losses.textContent=storedLosses
}
}


// Attach event listener to document to listen for key event
document.addEventListener("keydown", function (event) {
  // If the count is zero, exit function
  if (secondsLeft === 0) {
    return;
  }
  // Convert all keys to lower case
  var key = event.key.toLowerCase();
  var alphabetNumericCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");
  // Test if key pushed is letter
  if (alphabetNumericCharacters.includes(key)) {
    var letterGuessed = event.key;
    checkLetter(letterGuessed)
    checkWins();
  }
});

function resetGame(){
winCounter=0;
loseCounter=0;
setWins();
setLosses();
}

resetButton.addEventListener("click", resetGame)


startButton.addEventListener("click", startGame)

init();
