const playNumber = 4;
let chanceNumber = 10;
let randNumArr = [0, 0, 0, 0];
let userArr = [];
let count = 0;
let gameSwitch = true;
let strike = 0;
let ball = 0;
let out = 0;

const userNumber = document.querySelector(".user-number");
const inputValBtn = document.querySelector(".inputval-btn");
const userChanceText = document.querySelector(".user-chance");
let homeruneHTML = document.querySelector(".homerun");
let strikeHTML = document.querySelector(".strike");
let ballHTML = document.querySelector(".ball");
let outHTML = document.querySelector(".out");
const userInput = document.querySelector(".user-input");

makeRandomNumber();

function makeRandomNumber() {
  for (let i = 0; i < playNumber; i++) {
    randNumArr[i] = Math.floor(Math.random() * 9);
  }
  ovelapRemove();
}

function ovelapRemove() {
  const set = new Set(randNumArr);
  const newRandArr = Array.from(set); //중복없는 배열

  if (newRandArr.length !== playNumber) {
    makeRandomNumber();
  } else {
    return;
  }
}
//===============================랜덤숫자 받는 코드
console.log(randNumArr);

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
    }
    whatisComNumber(userGuessNumber);
  }

  function whatisComNumber(userGuessNumber) {
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

    gameHint();
  }

  function gameHint() {
    if (strike == playNumber) {
      homeruneHTML = "HomeRun ~!!";
      userChanceText.innerText = "0";
      document.querySelector(".game-win").classList.remove("hidden");
      userInput.classList.add("hidden");

      return;
    } else {
      strikeHTML.innerText = `${strike}스트라이크`;
      ballHTML.innerText = `${ball}볼`;

      strike = 0;
      ball = 0;
    }
  }
}
