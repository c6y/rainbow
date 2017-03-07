// Import functions
import { improveAreaFactor } from './improveAreaFactor.js';

/**
  * returns the scaled image dimensions that preserve pixel integrity
  * takes into account the device pixel ratio
  * @param {number} oWidth The original image width.
  * @param {number} oHeight The original image width.
  * @param {number} maxWidth The original image width.
  * @param {number} maxHeight The original image width.
  * @return {number} width A scaled width value
  * @return {number} height A scaled height value
  * @return {number} width the value the image is scaled by
  */
export function scaleByIntToFit(oWidth, oHeight, maxWidth, maxHeight) {
  // Calculate if seen on high resolution devices
  // If so, content can be scaled down
  // This way we have more options scaling it up later
  const deviceRatio = window.devicePixelRatio;
  const wImg = oWidth / deviceRatio;
  const hImg = oHeight / deviceRatio;

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
