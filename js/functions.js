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


const minutes = 60;

const checkTime = (workingDayStart, workingDayEnd, meetingStart, meetingDuration) => {
  workingDayStart = workingDayStart.split(':');
  workingDayEnd = workingDayEnd.split(':');
  meetingStart = meetingStart.split(':');

  const timeOfWorkingDay = (minutes - parseInt(workingDayStart[1], 2)) + (parseInt(workingDayEnd[0], 2)
   - (parseInt(workingDayStart[0], 2) + 1)) * minutes + parseInt(workingDayEnd[1], 2);
  const timeUntilEnd = (minutes - parseInt(meetingStart[1], 2)) + (parseInt(workingDayEnd[0], 2)
   - (parseInt(meetingStart[0], 2) + 1)) * minutes + parseInt(workingDayEnd[1], 2);

  if (meetingDuration <= timeOfWorkingDay){
    if (workingDayStart[0] < meetingStart[0] && timeUntilEnd >= meetingDuration){
      return true;
    }
    else if (workingDayStart[0] === meetingStart[0] && workingDayStart[1] <= meetingStart[1]) {
      return true;
    }
  }
  return false;
};

checkTime('08:00', '17:30', '14:00', 90);  // true
checkTime('8:0', '10:0', '8:0', 120);     // true
checkTime('08:00', '14:30', '14:00', 90); // false
checkTime('14:00', '17:30', '08:0', 90);  // false
checkTime('8:00', '17:30', '08:00', 900); // false
