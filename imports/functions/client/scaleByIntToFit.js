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
export function scaleByIntToFit(oWidth, oHeight, maxWidth, maxHeight) {
  const wImg = oWidth;
  const hImg = oHeight;
  const wMax = maxWidth;
  const hMax = maxHeight;

  const wFactor = Math.floor(wMax / wImg);
  const hFactor = Math.floor(hMax / hImg);
  // scale to no less than 1
  const minFactor = Math.max(Math.min(wFactor, hFactor), 1);

  const wTarget = wImg * minFactor;
  const hTarget = hImg * minFactor;

  return {
    width: wTarget,
    height: hTarget,
    factor: minFactor
  };
}
