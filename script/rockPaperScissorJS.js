let score = JSON.parse(localStorage.getItem("score"));

      if (score === null) {
        score = {
          wins: 0,
          loses: 0,
          tied: 0,
        };
      }
      updatedScore();

      let computerMove = "";
      let playerSelect = "";
      let finalResult = "";
      let autoPlyaing = false;
      let intervalID;

      function autoPlay() {
        if (!autoPlyaing) {
          intervalID = setInterval(function () {
            playerSelect = computerMoveSelect();
            computerMoveSelect();
            finalResult = compare(playerSelect);
            updatedScore();
            updatedResult();
            updatedStatus();
          }, 1000);
          document.querySelector('.js-autoPlay').innerHTML = 'Click again auto play button to stop auto play.';
          autoPlyaing = true;
          console.log(intervalID);
        } else {
          clearInterval(intervalID);
          autoPlyaing = false;
          document.querySelector('.js-autoPlay').innerHTML = '';
        }
      }

      function computerMoveSelect() {
        let randomNumber = Math.random();

        if (randomNumber <= 1 / 3) {
          computerMove = "Rock";
        } else if (randomNumber <= 2 / 3) {
          computerMove = "Paper";
        } else {
          computerMove = "Scissors";
        }
        return computerMove;
      }

      function compare(playerSelect) {
        let result = "";
        if (playerSelect === "Rock") {
          if (computerMove === "Rock") {
            result = "Tied";
            score.tied++;
          } else if (computerMove === "Paper") {
            result = "You lose";
            score.loses++;
          } else if (computerMove === "Scissors") {
            result = "You win";
            score.wins++;
          }
        } else if (playerSelect === "Paper") {
          if (computerMove === "Rock") {
            result = "You win";
            score.wins++;
          } else if (computerMove === "Paper") {
            result = "Tied";
            score.tied++;
          } else if (computerMove === "Scissors") {
            result = "You lose";
            score.loses++;
          }
        } else if (playerSelect === "Scissors") {
          if (computerMove === "Rock") {
            result = "You lose";
            score.loses++;
          } else if (computerMove === "Paper") {
            result = "You win";
            score.wins++;
          } else if (computerMove === "Scissors") {
            result = "Tied";
            score.tied++;
          }
        }
        localStorage.setItem("score", JSON.stringify(score));
        return result;
      }

      function updatedScore() {
        document.querySelector(
          ".js-score"
        ).innerHTML = `Wins: ${score.wins} Loses: ${score.loses} Tied: ${score.tied}`;
      }

      function updatedResult() {
        document.querySelector(".js-result").innerHTML = `${finalResult}`;
      }

      function updatedStatus() {
        document.querySelector(
          ".js-status"
        ).innerHTML = `You - <img class="player-img" src="img/${playerSelect}-emoji.png" alt="">\t\t\tComputer - <img class="computer-img" src="img/${computerMove}-emoji.png" alt="">`;
      }
      function resetGame() {
        document.querySelector(".js-result").innerHTML = "";
        document.querySelector(".js-status").innerHTML = "";
      }

