const playNumber = 4;
const chanceNumber = 10;
let randNumArr = [0, 0, 0, 0];
let userArr = [];
let count = 0;
let gameSwitch = true;
let strike = 0;
let ball = 0;
let out = 0;

const userNumber = document.querySelector(".user-number");
const inputValBtn = document.querySelector(".inputval-btn");
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
    userArr.push(userNumber.value); // 몰라 일단 배열에 담아 지울수도 있음
    const userGuessNumber = userNumber.value;
    if (count == chanceNumber) {
      console.log("게임을 종료합니다 .. 졋어요 ㅜ");
    }
    whatisComNumber(userGuessNumber);
  }

  function whatisComNumber(userGuessNumber) {
    if (userGuessNumber == randNumArr.join("")) {
      console.log("홈런~");
      return;
    } else if (userGuessNumber !== randNumArr.join("")) {
      out++;
      console.log(out + "아웃");
    }

    //1234 1334

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
    console.log("스트라이크" + strike);
    console.log("볼" + ball);
    strike = 0;
    ball = 0;
  }
}

// function gameWin() {}

// function gameLose() {}
