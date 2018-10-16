import * as messaging from 'messaging';
import AgeUI from "./ui.js";
import { calculateAgeInYear } from '../common/utils';
import clock from 'clock';
import { read_json_file, write_json_file } from '../common/file';

const ui = new AgeUI();
let error = false;

let birthday = read_json_file('birthday');

let color = read_json_file('theme');
if (color) {
  ui.updateTheme(color);
}

messaging.peerSocket.onmessage = evt => {
  if (evt.data.key === 'birthday' && evt.data.newValue) {
    const birthdayData = JSON.parse(evt.data.newValue).name.split('-');
    if (birthdayData.length === 3) {
      const year = parseInt(birthdayData[0], 10);
      const month = parseInt(birthdayData[1], 10);
      const day = parseInt(birthdayData[2], 10);
      birthday = [year, month, day];
      error = false;
      write_json_file('birthday', birthday);
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
  if (Array.isArray(birthday) && birthday.length === 3) {
    const age = calculateAgeInYear(birthday);
    ui.renderAge(age);
  } else {
    ui.renderInstructions(error);
  }
};