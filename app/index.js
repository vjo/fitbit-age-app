import * as messaging from 'messaging';
import AgeUI from "./ui.js";
import { calculateAgeInYear } from '../common/utils';
import clock from 'clock';
import { read_json_file, write_json_file } from '../common/file';

const BIRTHDAY_DATA_LENGTH = "YYYY-MM-DD".length;
const BIRTHDAY_DATA_WITH_TIME_LENGTH = "YYYY-MM-DD HH:mm".length;

const ui = new AgeUI();
let error = false;
let birthday = read_json_file('birthday');
let color = read_json_file('theme');

if (color) {
  ui.updateTheme(color);
}

messaging.peerSocket.onmessage = evt => {
  if (evt.data.key === 'birthday' && evt.data.newValue) {
    const birthdayData = JSON.parse(evt.data.newValue).name;
    if (birthdayData.length === BIRTHDAY_DATA_LENGTH || birthdayData.length === BIRTHDAY_DATA_WITH_TIME_LENGTH) {
      const [dateStr, timeStr] = birthdayData.split(' ');
      const time = timeStr && timeStr.match(/:/) ? timeStr.split(':') : undefined;
      const hour = time ? parseInt(time[0], 10) : 0;
      const minute = time ? parseInt(time[1], 10) : 0;

      const date = dateStr && dateStr.match(/-/) ? dateStr.split('-') : undefined;
      if (date.length === 3) {
        const year = parseInt(date[0], 10);
        const month = parseInt(date[1], 10);
        const day = parseInt(date[2], 10);

        birthday = [year, month, day, hour, minute];
        error = false;
        write_json_file('birthday', birthday);
      } else {
        console.log('Error, birthday date non valid');
        error = true;
        birthday = null;
      }
    } else {
      console.log('Error, birthday value non valid');
      error = true;
      birthday = null;
    }
  } else if (evt.data.key === 'theme' && evt.data.newValue) {
    const color = JSON.parse(evt.data.newValue);
    write_json_file('theme', color);
    ui.updateTheme(color);
  }
};

clock.granularity = 'seconds'; // Update the clock every second

clock.ontick = (evt) => {
  if (Array.isArray(birthday) && birthday.length === 5) {
    const age = calculateAgeInYear(birthday);
    ui.renderAge(age);
  } else {
    ui.renderInstructions(error);
  }
};
