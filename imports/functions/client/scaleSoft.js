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
export function scaleSoft(oWidth, oHeight, maxWidth, maxHeight) {
  const wImg = oWidth;
  const hImg = oHeight;
  const wMax = maxWidth;
  const hMax = maxHeight;
  //
  // console.log('wImg: ' + wImg);
  // console.log('wMax: ' + wMax);

  const wFactor = wMax / wImg;
  const hFactor = hMax / hImg;

  // console.log('wFactor/hFactor: ' + wFactor + '/' + hFactor);

  const minFactor = Math.min(wFactor, hFactor);
  // console.log('minFactor: ' + minFactor);

  // const wTarget = wImg;
  // const hTarget = hImg;

  const wTarget = wImg * minFactor;
  const hTarget = hImg * minFactor;

  return {
    width: wTarget,
    height: hTarget
    // factor: minFactor
  };
}
