// Meteor
import { Meteor } from 'meteor/meteor';

// Import functions
import { scalePaddingFactor } from './scalePaddingFactor.js';

/**
  * returns the scaled image dimensions that preserve pixel integrity
  * @param {number} oWidth The original image width.
  * @param {number} oHeight The original image width.
  * @param {number} maxWidth The original image width.
  * @param {number} maxHeight The original image width.
  * @return {number} width A scaled width value
  * @return {number} height A scaled height value
  * @return {number} width the value the image is scaled by
  */
export function scaleByIntToFit(oWidth, oHeight, maxWidth, maxHeight, name) {
  // Set padding to 1 rem
  const padding = Meteor.settings.public.dimensions.rem;
  const wBox = maxWidth - padding;
  const hBox = maxHeight - padding;

  // Factor in if content is seen on high resolution devices
  // If so, content can be scaled down
  // This way we have more options scaling it up later
  const deviceRatio = window.devicePixelRatio;
  const wImg = oWidth / deviceRatio;
  const hImg = oHeight / deviceRatio;

  // Calculate the factors, both for width and height
  // round to lower integer, this cannot be lower than 0
  const wFactor = Math.floor(wBox / wImg);
  const hFactor = Math.floor(hBox / hImg);

  // take the smaller value of the factors above
  // but factor should not be lower than 1
  // (a pixel cannot be smaller than a pixel)
  const minFactor = Math.max(Math.min(wFactor, hFactor), 1);
  // console.log('minFactor: ' + minFactor);

  const wTarget = wImg * minFactor;
  const hTarget = hImg * minFactor;

  const factor = scalePaddingFactor(wTarget, hTarget, wBox, hBox, name, minFactor);



  return {
    width: wTarget * factor,
    height: hTarget * factor,
    factor: minFactor * factor
  };
}
