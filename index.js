isGameOn = false
colorList = ["yellow", "green", "blue", "red"]

$(document).keydown(function() {
  if (!isGameOn) {
    level = 0;
    i = 0;
  colorSequence = [];
  playerSequence = [];
  isGameOn = true;
  newRound();

}});

$(".btn").click(function() {

  var choosenColor = this.id;
  playerSequence.push(choosenColor);
  pressedButtonAnimation(choosenColor);
  flashOnClickButton(choosenColor);
  audioSound(choosenColor);
  testChoosenColor(playerSequence.length-1);
})

function testChoosenColor(currentLevel) {
  if (playerSequence[currentLevel] === colorSequence[currentLevel]) {
    if (playerSequence.length === colorSequence.length) {
      setTimeout(function () {
        newRound();
      }, 1000);
    }
  } else {
    gameOver()
  }
}

function newRound() {
// Colore casuale aggiunto a lista dei colori da premere
playerSequence = [];
level++;
$("#level-title").text("Level " + level);
randomNumber = Math.floor(Math.random() * 4);
randomColor = colorList[randomNumber];

colorSequence.push(randomColor);
flashOnClickButton(randomColor);
audioSound(randomColor);
};

function pressedButtonAnimation(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 200);
};

function flashOnClickButton(color) {
  $("#" + color).fadeOut(100).fadeIn(100);
};

function audioSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
};

function gameOver() {
  audioSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");

  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  restartGame();
};

function restartGame() {
  colorSequence = [];
  playerSequence = [];
  level = 0;
  isGameOn = false;
};
