import document from 'document';
import { MILLISECONDS_IN_YEAR, monoDigits } from '../common/utils';

export default function AgeUI() {
  this.screenWidth = document.getElementById('root').width;
  this.ageLabel = document.getElementById('age');
  this.ageDecimalsLabel = document.getElementById('age-decimals');
  this.ageUnitLabel = document.getElementById('age-unit');
  this.instructionLabel0 = document.getElementById('instruction0');
  this.instructionLabel1 = document.getElementById('instruction1');
  this.progressBar = document.getElementById('progress-bar');
}

AgeUI.prototype.clearInstructions = function() {
  this.instructionLabel0.text = '';
  this.instructionLabel1.text = '';
};

AgeUI.prototype.clearAge = function() {
  this.ageLabel.text = '';
  this.ageDecimalsLabel.text = '';
  this.ageUnitLabel.text = '';
  this.progressBar.width = 0;
};

AgeUI.prototype.renderInstructions = function(error) {
  this.clearAge();
  if(error) {
    this.instructionLabel0.text = 'Error:';
    this.instructionLabel1.text = 'Invalid birthday date.';
  } else {
    this.instructionLabel0.text = 'Use companion app to';
    this.instructionLabel1.text = 'set your birthday date.';
  }
};

AgeUI.prototype.renderAge = function(ageMilliseconds) {
  this.clearInstructions();
  this.updateProgressBar(ageMilliseconds);
  const ageInYears = monoDigits((ageMilliseconds / MILLISECONDS_IN_YEAR).toFixed(9)).split('.');
  this.ageLabel.text = ageInYears[0];
  this.ageDecimalsLabel.text = `.${ageInYears[1]}`;
  this.ageUnitLabel.text = 'YEARS OLD';
};

AgeUI.prototype.updateProgressBar = function(ageMilliseconds) {
  const decimal = (ageMilliseconds / MILLISECONDS_IN_YEAR).toFixed(9) % 1; // Keep decimal part by using `% 1`
  this.progressBar.width = this.screenWidth * decimal;
};

AgeUI.prototype.updateTheme = function(color) {
  this.progressBar.style.fill = color;
  this.ageUnitLabel.style.fill = color;
}
