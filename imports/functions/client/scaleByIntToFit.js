// Import functions
import { improveAreaFactor } from './improveAreaFactor.js';

/**
  * returns the scaled image dimensions that preserve pixel integrity
  * takes into account the device pixel ratio
  * @param {number} oWidth The original image width.
  * @param {number} oHeight The original image width.
  * @param {number} maxWidth The original image width.
  * @param {number} maxHeight The original image width.
  * @param {number} myRatio Pixel ratio.
  * @return {number} width A scaled width value
  * @return {number} height A scaled height value
  * @return {number} width the value the image is scaled by
  */
export function scaleByIntToFit(oWidth, oHeight, maxWidth, maxHeight, myRatio) {
  // If the myRatio is not set
  // calculate the ratio based on the device's pixel ratio
  let ratio;
  if (myRatio) {
    ratio = myRatio;
  } else {
    ratio = window.devicePixelRatio;
  }

  // based on the ratio (resolution), calculate the raw dimensions (floats)
  const wImg = oWidth / ratio;
  const hImg = oHeight / ratio;

  // Calculate the factors, both for width and height
  // round to lower integer, this cannot be lower than 0
  const wFactor = Math.floor(maxWidth / wImg);
  const hFactor = Math.floor(maxHeight / hImg);

  // take the smaller value of the factors above
  // but factor should not be lower than 1
  // (a pixel cannot be smaller than a pixel)
  let factor = Math.max(Math.min(wFactor, hFactor), 1);

  factor = improveAreaFactor(factor, wImg, hImg, maxWidth, maxHeight);

  const wTarget = wImg * factor;
  const hTarget = hImg * factor;

  return {
    width: wTarget,
    height: hTarget,
    factor: factor
  };
}
