// Convert a number to a special monospace number
export function monoDigits(digits) {
  let ret = '';
  let str = digits.toString();
  for (var index = 0; index < str.length; index++) {
    var num = str.charAt(index);
    if(isNaN(parseInt(num, 10))) {
      ret = ret.concat(num);
    } else {
      ret = ret.concat(hex2a('0x1' + num));
    }
  }
  return ret;
}

// Hex to string
export function hex2a(hex) {
  let str = '';
  for (var index = 0; index < hex.length; index += 2) {
    let val = parseInt(hex.substr(index, 2), 16);
    if (val) str += String.fromCharCode(val);
  }
  return str.toString();
}

// Time helper
const MILLIS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const DAYS_IN_YEAR = 365;
const MILLISECONDS_IN_YEAR = MILLIS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR * HOURS_IN_DAY * DAYS_IN_YEAR;
const MILLISECONDS_IN_LEAP_YEAR = MILLIS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR * HOURS_IN_DAY * (DAYS_IN_YEAR + 1);
const isLeapYear = (date) => {
    var y = date.getFullYear();
    return !(y % 4) && (y % 100) || !(y % 400);
};

// Return age in year object
export function calculateAgeInYear(birthdayData) {
  const birthYear = birthdayData[0];
  const birthMonth = birthdayData[1] - 1;
  const birthDay = birthdayData[2];
  const birthHour = birthdayData[3];
  const birthMinute = birthdayData[4];
  const currentYear = (new Date()).getFullYear();

  const birthdayThisYearDate = new Date(currentYear, birthMonth, birthDay, birthHour, birthMinute);
  const nextBirthdayYear = birthdayThisYearDate < Date.now() ? currentYear + 1 : currentYear;
  const nextBirthdayDate = new Date(nextBirthdayYear, birthMonth, birthDay, birthHour, birthMinute);

  const ms = isLeapYear(nextBirthdayDate) ? MILLISECONDS_IN_LEAP_YEAR : MILLISECONDS_IN_YEAR;
  const decimalDiff = (Date.now() - nextBirthdayDate.getTime()) / ms;
  const yearDiff = nextBirthdayYear - birthYear;
  const age = yearDiff + decimalDiff;
  const parts = age.toFixed(9).toString().split('.');

  return {
    year: parts[0],
    decimal: parts[1],
    progress: 1 + decimalDiff
  };
};
