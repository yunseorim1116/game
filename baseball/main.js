const randNumArr = [];
const playNumber = 4;

makeRandomNumber();

//4808

function makeRandomNumber() {
  for (let i = 0; i < playNumber; i++) {
    randNumArr.push(Math.floor(Math.random() * 9));
  }

  ovelapRemove();
}

1123

function ovelapRemove() {
  for (let i = 0; i < playNumber; i++) {
    for (let j = 0; j < playNumber; j++) {
      if (randNumArr[i] == randNumArr[j] && i != j) {
        randNumArr[i] = Math.floor(Math.random() * 9);
        i--;
      }
    }
  }
  console.log(randNumArr);
}
