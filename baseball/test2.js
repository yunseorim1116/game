document.addEventListener("DOMContentLoaded", () => {
  new TypeIt("#title", {}).go();
});

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
let gameSwitch = false;
let strikeBol = false;
let ballBol = false;

const userNumber = document.querySelector(".user-number");
const inputValBtn = document.querySelector(".inputval-btn");
const userChanceText = document.querySelector(".user-chance");
let homeruneHTML = document.querySelector(".homerun");
let strikeHTML = document.querySelector(".strike");
let ballHTML = document.querySelector(".ball");
let outHTML = document.querySelector(".out");
const userInput = document.querySelector(".user-input");
const userNum = document.querySelector(".show-user-num");
const comNumAlert = document.querySelector(".com-num-alret");

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
  const userGuessNumber = userNumber.value;
  const set = new Set(userGuessNumber.split(""));
  if (userGuessNumber.length !== 4) {
    //네자리 아니면 안됨 / 유효성 검증
    alert("숫자 네자리를 입력해주세요!");
    userNumber.value = "";
    return;
  } else if (set.size !== 4) {
    //유저가 입력하는 중복숫자 막아주기
    alert("중복된 숫자는 안돼요!");
    userNumber.value = "";
    return;
  } else {
    //유효성 검증 완료, 찐 로직 시작
    count++;

    userChanceText.innerText = chanceNumber - count;
    userNumber.value = "";
    userNumber.focus();

    whatisComNumber(userGuessNumber);
  }

  function whatisComNumber(userGuessNumber) {
    outCheck = false;
    repit(userGuessNumber); //스트라이크,볼 갯수 검사하고
    makeUserNumHtml(userGuessNumber); //그걸 토대로 div박스만들어주고
    gameHint(userGuessNumber); //홈런,스트라이크 체크

    if (count == 10) {
      gameSwitch = true;
      document.querySelector(".game-lose").classList.remove("hidden");
      document.querySelector(".game-hint-box").classList.add("hidden");
      userInput.classList.add("hidden");
      makeUserNumHtml(randNumArr);
    }
  }

  function repit(userGuessNumber, newArr) {
    console.log(userGuessNumber);

    for (let i = 0; i < 4; i++) {
      if (randNumArr[i] == userGuessNumber[i]) {
        strike++;
        if (strikeBol) {
          console.log(newArr);
        }
      }

      for (let j = 0; j < 4; j++) {
        if (randNumArr[i] == userGuessNumber[j]) {
          ball++;
          if (ballBol) {
            console.log(newArr);
          }
        }
      }
    }
  }

  function makeUserNumHtml(arr) {
    const divAllBox = document.createElement("div");
    divAllBox.classList.add("userNumAllbox");

    divAllBox.id = `userChoice${count}`;
    for (let x of arr) {
      if (gameSwitch) {
        console.log(gameSwitch);
        const divBox = document.createElement("div");
        divBox.classList.add("userNumbox");
        divBox.innerText = x;
        divAllBox.appendChild(divBox);
        divBox.style.backgroundColor = "rgb(18, 199, 18)";
        divAllBox.classList.remove("userNumAllbox");
        divAllBox.classList.add("userNumAllbox2");
        comNumAlert.classList.remove("hidden");
        comNumAlert.appendChild(divAllBox);
        document.getElementById("chance").innerText =
          "컴푸타에게 패배하였습니다.";
      } else {
        const divBox = document.createElement("div");
        divBox.classList.add("userNumbox");

        divBox.innerText = x;
        divAllBox.appendChild(divBox);

        //////////////////////

        userNum.insertBefore(divAllBox, userNum.firstChild); //맨 앞에 삽입
      }
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

    !outCheck
      ? outHTML.classList.remove("hidden")
      : outHTML.classList.add("hidden");

    if (strike == playNumber && outCheck) {
      //자꾸 아웃일떄도 초로기가 떠...
      console.log(strike);
      const changeColorGreen = document.getElementById(`userChoice${count}`);
      const outBox = changeColorGreen.childNodes;
      outBox.forEach((ele) => {
        ele.style.backgroundColor = "rgb(18, 199, 18)";
      });

      document.querySelector(".game-win").classList.remove("hidden");
      document.querySelector(".game-hint-box").classList.add("hidden");
      userInput.classList.add("hidden");

      return;
    } else if (!outCheck) {
      console.log(count);
      const changeColorRed = document.getElementById(`userChoice${count}`);
      const outBox = changeColorRed.childNodes;
      outBox.forEach((ele) => {
        ele.style.backgroundColor = "rgb(35, 163, 35)";
      });
    } else {
      strikeHTML.innerText = `${strike} 스트라이크`;
      ballHTML.innerText = `${ball} 볼`;

      const newArr = userGuessNumber.split("");
    

      strikeBol = true;
      ballBol = true;

      repit(userGuessNumber, newArr);

      //초기화
      strikeBol = false;
      ballBol = false;
      strike = 0;
      ball = 0;
    }

    //다른 방법 생각해본건strile,ball이 0이며
  }
}
