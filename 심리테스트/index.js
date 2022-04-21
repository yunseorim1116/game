const startBtn = document.querySelector(".game-start");
const allContainter = document.querySelector(".all-content");
const content = document.querySelectorAll(".all-answer");
const resultAnswer = document.querySelectorAll(".result-answer");

let veiwPoint = 200;

const result1 = [];
const result2 = [];

startBtn.addEventListener("click", () => {
  allContainter.style.transform = `translate(-100vw)`; //처음에 스타트 버튼 누르면 -100삭감
});

resultAnswer.forEach((ele) => {
  ele.addEventListener("click", (event) => nextPage(event));
});

function nextPage(event) {
  allContainter.style.transform = `translate(-${veiwPoint}vw)`; //두번째는 200이동해야하고
  veiwPoint = veiwPoint + 100; //계속해서 누적 !
  const choice = event.currentTarget.firstElementChild;
  console.log(choice.className);

  if (choice.className == "answer1") {
    result1.push(1);
  } else {
    result2.push(2);
  }

  console.log(result1);
  console.log(result2);

  if (veiwPoint == 1100) {
    setTimeout(function () {
      showResult();
    }, 4000);
  }
}

function showResult() {
  const realResult = result2.length;
  console.log(realResult);
  if (realResult == 0 || realResult == 1 || realResult == 2 || realResult == 3 )  {
    location.href = "result1.html";
  } else if (realResult == 4) {
    location.href = "result2.html";
  } else if (realResult == 5) {
    location.href = "result3.html";
  } else {
    location.href = "result4.html";
  }
}
