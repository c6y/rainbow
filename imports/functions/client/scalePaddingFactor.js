import { Meteor } from 'meteor/meteor';

/**
* Calculates the factor of the pixel image inside the display box
* based on the settings
* returns the scaled target dimensions
* @param {number} wTarget The original image width.
* @param {number} hTarget The original image width.
* @param {number} wBox The original image width.
* @param {number} boxHeight The original image width.
* @return {number} width A scaled width value
* @return {number} height A scaled height value
* @return {number} width the value the image is scaled by
*/
export function scalePaddingFactor(wTarget, hTarget, wBox, hBox, name, oFactor) {
  // Get dimensions from settings file
  // const rem = Meteor.settings.public.dimensions.rem;
  // const cell = Meteor.settings.public.dimensions.cell;
  // const cellMargin = Meteor.settings.public.dimensions.cellMargin;
  //
  // const thumbDim = rem * cell;

  const targetArea = wTarget * hTarget;
  const boxArea = wBox * hBox;
  const usedArea = targetArea / boxArea;

  if (usedArea < 0.25) {
    console.log(name + ' : ' + usedArea + ', original Factor: ' + oFactor);
    return (oFactor + 1) / oFactor;
  }
  return 1;
}
