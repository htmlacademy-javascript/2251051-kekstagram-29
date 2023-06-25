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
