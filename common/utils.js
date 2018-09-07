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
export const MILLISECONDS_IN_YEAR = MILLIS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR * HOURS_IN_DAY * DAYS_IN_YEAR;