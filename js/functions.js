const checkLength = (checkedString, maxLength) => checkedString.length <= maxLength;

checkLength('проверяемая строка', 20);  // true
checkLength('проверяемая строка', 18);  // true
checkLength('проверяемая строка', 10);  // false


const checkPalindrome = (checkedLine) => {
  const newLine = checkedLine.replaceAll(' ', '').toLowerCase();
  let emptyLine = '';

  for (let index = newLine.length - 1; index >= 0; index--) {
    emptyLine += newLine[index];
  }

  return (newLine === emptyLine);
};

checkPalindrome('топот');  // true
checkPalindrome('ДовОд');  // true
checkPalindrome('Кекс');  // false
checkPalindrome('Лёша на полке клопа нашёл ');  // true


const findNumber = (argument) => {
  argument = argument.toString();
  let newString = '';

  for (let index = 0; index <= argument.length - 1; index++ ) {
    if (!Number.isNaN(parseInt(argument[index], 10))) {
      newString += parseInt(argument[index], 10);
    }
  }

  return parseInt(newString, 10);
};

findNumber('ECMAScript 2022');   // 2022
findNumber('1 кефир, 0.5 батона');  // 105
findNumber('агент 007');  // 7
findNumber('а я томат');  // NaN
findNumber(2023);  // 2023
