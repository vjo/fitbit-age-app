import * as messaging from 'messaging';
import AgeUI from "./ui.js";
import clock from 'clock';
import { read_json_file, write_json_file } from '../common/file';

const ui = new AgeUI();
let error = false;
let birthday = read_json_file('birthday');
if (birthday) {
  const birthdayData = JSON.parse(birthday).name.split('-');
  birthday = new Date(birthdayData[0], birthdayData[1]-1, birthdayData[2]);
}

messaging.peerSocket.onmessage = evt => {
  console.log(`App received: ${JSON.stringify(evt)}`);
  if (evt.data.key === 'birthday' && evt.data.newValue) {
    write_json_file('birthday', evt.data.newValue);
    const birthdayData = JSON.parse(evt.data.newValue).name.split('-');
    if (birthdayData.length === 3) {
      error = false;
      birthday = new Date(birthdayData[0], birthdayData[1]-1, birthdayData[2]);
      console.log(`Setting birthday date to: ${birthday}`);
    } else {
      console.log('Error, birthday value non valid');
      error = true;
      birthday = null;
    }
  }
};

clock.granularity = 'seconds'; // Update the clock every second

clock.ontick = (evt) => {
  if (birthday) {
    const diff = new Date() - birthday;
    ui.renderAge(diff);
  } else {
    ui.renderInstructions(error);
  }
};