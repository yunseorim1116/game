const MaxRange = 20;
const comNumber = Math.floor(Math.random() * MaxRange) + 1;

const userInput = document.querySelector(".user-answer__input"); //입력창
const playBtn = document.querySelector(".user-answer__btn"); //제출창
const hidden = document.querySelector(".hidden");

const playButton = document.querySelector(".play-button");

const userNumberArr = [];
const finishNumber = 10;
let count = 10;
const chaceNumber = document.querySelector(".chance-number");
const gameChaceNumber = document.querySelector(".game-result__chance");

const chanceAlter = document.querySelector(".chance-alret");

const resultLose = document.querySelector(".game-result__lose"); //졌을때 텍스트 삽입
const resultWin = document.querySelector(".game-result__win"); //이겼을때 텍스트 삽입

const hiddenBox = document.querySelector(".result-hidden"); //결과창 숨김박스

userInput.addEventListener("keydown", gameInit);

chaceNumber.innerText = finishNumber;
gameChaceNumber.innerText = count;

console.log(comNumber);
function gameInit(e) {
  //클릭,엔터 둘다 기능 동작하게
  playBtn.addEventListener("click", gameStart);
  if (e.keyCode === 13) {
    e.preventDefault();
    gameStart();
  }
}

function gameStart() {
  //   userInput.focus();

  if (userInput.value > 20 || userInput.value < 1) {
    //유효성 검사 해주고
    alert("입력범위를 지켜주세요,숫자를 다시 입력하세요!");
    userInput.value = "";
    userInput.focus();
  } else {
    hint();
    count--;

    gameChaceNumber.innerText = count; //남은 횟수 보여주기
  }

  if (comNumber == userInput.value) {
    //점수를 맞혔을때
    gameFinWin();
  } else if (count == 0 && comNumber !== userInput.value) {
    //횟수 다 소진했을때
    gameFinLose();
  }

  userInput.value = "";
}

function gameFinLose() {
  hiddenBox.classList.add("hidden");
  chanceAlter.classList.add("hidden");
  resultLose.innerText = `컴퓨터 넘버는 ${comNumber}! 당신은 패배했어요 T^T`;
  hidden.classList.remove("hidden");
  playButton.addEventListener("click", () => {
    location.href = "index.html";
  });
}

function gameFinWin() {
  hiddenBox.classList.add("hidden");
  chanceAlter.classList.add("hidden");
  resultWin.innerText = `컴퓨터 넘버는 ${comNumber}! 당신이 이겼어요!^A^`;
  hidden.classList.remove("hidden");
  playButton.addEventListener("click", () => {
    location.href = "index.html";
  });
}

function hint() {
  if (comNumber > userInput.value) {
    alert(`컴퓨터 숫자는 ${userInput.value} 보다 위 입니다.`);
  } else if (comNumber < userInput.value) {
    alert(`컴퓨터 숫자는 ${userInput.value} 보다 아래 입니다.`);
  }
}
