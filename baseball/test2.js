const playNumber = 4;

let set = new Set();
while (set.size < playNumber) set.add(Math.floor(Math.random() * 9));
const randNumArr = Array.from(set); //중복없는 배열 만들기

console.log(randNumArr);

let chanceNumber = 10;
let count = 0;
let strike = 0;
let ball = 0;
let out = 0;
let outCheck = false;

const userNumber = document.querySelector(".user-number");
const inputValBtn = document.querySelector(".inputval-btn");
const userChanceText = document.querySelector(".user-chance");
let homeruneHTML = document.querySelector(".homerun");
let strikeHTML = document.querySelector(".strike");
let ballHTML = document.querySelector(".ball");
let outHTML = document.querySelector(".out");
const userInput = document.querySelector(".user-input");
const userNum = document.querySelector(".show-user-num");

userChanceText.innerText = chanceNumber - count;

userNumber.addEventListener("keydown", valSubmit);

function valSubmit(e) {
  inputValBtn.addEventListener("click", compareNumber);
  if (e.keyCode === 13) {
    e.preventDefault();
    compareNumber();
  }
}

function compareNumber() {
  if (userNumber.value.length !== 4) {
    alert("숫자 네자리를 입력해주세요!");
    userNumber.value = "";
    return;
  } else {
    //찐 로직 시작
    count++;
    const userGuessNumber = userNumber.value;
    userChanceText.innerText = chanceNumber - count;
    userNumber.value = "";
    userNumber.focus();

    if (count == 10) {
      document.querySelector(".game-lose").classList.remove("hidden");
      document.querySelector(".game-hint-box").classList.add("hidden");
      userInput.classList.add("hidden");
    }
    whatisComNumber(userGuessNumber);
  }

  function whatisComNumber(userGuessNumber) {
    outCheck = false;
    for (let i = 0; i < 4; i++) {
      if (randNumArr[i] == userGuessNumber[i]) {
        strike++;
      }

      for (let j = 0; j < 4; j++) {
        if (randNumArr[i] == userGuessNumber[j]) {
          ball++;
        }
      }
    }

    makeUserNumHtml(userGuessNumber);
    gameHint(userGuessNumber);
  }

  function makeUserNumHtml(userGuessNumber) {
    const divAllBox = document.createElement("div");
    divAllBox.classList.add("userNumAllbox");
    divAllBox.id = `userChoice${count}`;
    for (let x of userGuessNumber) {
      const divBox = document.createElement("div");
      divBox.classList.add("userNumbox");

      divBox.innerText = x;
      divAllBox.appendChild(divBox);
      userNum.insertBefore(divAllBox, userNum.firstChild); //맨 앞에 삽입
    }
  }

  function gameHint(userGuessNumber) {
    const userChoiceNumber = userGuessNumber.split("");

    userChoiceNumber.forEach((userNumber) => {
      for (let j = 0; j < userChoiceNumber.length; j++) {
        if (userNumber == randNumArr[j]) {
          outCheck = true;
        }
      }
    });

    console.log(outCheck);
    !outCheck
      ? outHTML.classList.remove("hidden")
      : outHTML.classList.add("hidden");

    if (strike == playNumber) {
      const changeColorGreen = document.querySelectorAll(".userNumbox");
      changeColorGreen.forEach((ele) => {
        ele.style.backgroundColor = "green";
      });

      homeruneHTML = "HomeRun ~!!";
      userChanceText.innerText = "0";
      document.querySelector(".game-win").classList.remove("hidden");
      document.querySelector(".game-hint-box").classList.add("hidden");
      userInput.classList.add("hidden");

      return;
    } else if (!outCheck) {
      console.log(count);
      const changeColorRed = document.getElementById(`userChoice${count}`);
      const outBox = changeColorRed.childNodes;
      outBox.forEach((ele) => {
        ele.style.backgroundColor = "rgb(255, 75, 75)";
      });
    } else {
      strikeHTML.innerText = `${strike} 스트라이크`;
      ballHTML.innerText = `${ball} 볼`;

      strike = 0;
      ball = 0;
    }

    //다른 방법 생각해본건strile,ball이 0이며
  }
}
