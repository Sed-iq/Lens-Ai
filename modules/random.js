// Generates random numbers
const randomGen = (range) => {
  let strNum = "";
  let arrNum = [];
  for (let i = 0; i < range; i++) {
    let number = Math.round(Math.random() * 7);
    arrNum.push(number);
  }
  arrNum.forEach((num) => {
    strNum += num;
  });
  return strNum;
};
module.exports = randomGen;
