import clock from 'clock';
import document from 'document';
import * as messaging from 'messaging';
import { MILLISECONDS_IN_YEAR, monoDigits } from '../common/utils';

// Update the clock every second
clock.granularity = 'seconds';

const ageLabel = document.getElementById('age');
const instructionLabel0 = document.getElementById('instruction0');
const instructionLabel1 = document.getElementById('instruction1');
let birthday;

messaging.peerSocket.onmessage = evt => {
  console.log(`App received: ${JSON.stringify(evt)}`);
  if (evt.data.key === 'birthday' && evt.data.newValue) {
    const birthdayData = JSON.parse(evt.data.newValue).name.split('-');
    if (birthdayData.length === 3) {
      birthday = new Date(birthdayData[0], birthdayData[1]-1, birthdayData[2]);
      console.log(`Setting birthday date to: ${birthday}`);
    } else {
      console.log('Error, birthday value non valid');
      instructionLabel0.text = 'Error:';
      instructionLabel1.text = 'Invalid birthday value.';
    }
  }
};

// Update the <text> elements every tick with the current time
clock.ontick = (evt) => {
  if (birthday) {
    const diff = new Date() - birthday;
    const age = monoDigits((diff / MILLISECONDS_IN_YEAR).toFixed(9));
    ageLabel.text = `${age} years old`;
    instructionLabel0.text = '';
    instructionLabel1.text = '';
  } else {
    ageLabel.text = '';
    instructionLabel0.text = 'Use companion app to';
    instructionLabel1.text = 'set your birthday date.';
  }
}
