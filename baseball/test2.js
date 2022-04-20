const playNumber = 4;

let set = new Set();
while (set.size < playNumber) set.add(Math.floor(Math.random() * 9));
const newRandArr = Array.from(set); //중복없는 배열

console.log(newRandArr);
