/* eslint-disable no-undef */
function checkLength(string, requiredLength) {
  return string.length <= requiredLength;
}

checkLength('строка', 20);

function isPalindrom(string) {
  const normalizedString = string.replaceAll(' ', '').toUpperCase();

  let emptyString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    emptyString += normalizedString[i];
  }

  if (normalizedString === emptyString) {
    return true;
  }

  return false;
}

isPalindrom('какая-то строка');

isNumber('функция 2023');

function isOutOfTimeLimit(workStart, workEnd, meetingStart, meetingTime) {

  const timeStrings = [workStart, workEnd, meetingStart];

  const totalMinutes = timeStrings.map((timeString) => (
    (([hours, minutes]) => hours * 60 + minutes)(timeString.split(':').map(Number))
  ));

  totalMinutes.push(parseInt(meetingTime, 10));

  if (totalMinutes[2] + meetingTime > totalMinutes[1]) {
    return false;
  } else if (totalMinutes[2] < totalMinutes[0]) {
    return false;
  }

  return true;
}

isOutOfTimeLimit('08:00', '17:30', '14:00', 90);
