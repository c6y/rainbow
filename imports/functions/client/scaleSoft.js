// Import functions
import { improveAreaFactor } from './improveAreaFactor.js';

/**
  * returns scaled image dimensions that fit into a bounding box
  * takes into account the device pixel ratio
  * @param {number} oWidth The original image width.
  * @param {number} oHeight The original image height.
  * @param {number} maxWidth The bounding box width.
  * @param {number} maxHeight The bounding box height.
  * @return {number} width A scaled width value
  * @return {number} height A scaled height value
  */
export function scaleSoft(oWidth, oHeight, maxWidth, maxHeight) {
  // calculate the ratio based on the device's pixel ratio
  const ratio = window.devicePixelRatio;

  // based on the ratio (resolution), calculate the raw dimensions (floats)
  const wImg = oWidth / ratio;
  const hImg = oHeight / ratio;

  // Calculate the factors, both for width and height
  const wFactor = maxWidth / wImg;
  const hFactor = maxHeight / hImg;

  // take the smaller value of the factors above
  let factor = Math.min(wFactor, hFactor);

  factor = improveAreaFactor(factor, wImg, hImg, maxWidth, maxHeight);

  const wTarget = wImg * factor;
  const hTarget = hImg * factor;

  return {
    width: wTarget,
    height: hTarget
  };
}
