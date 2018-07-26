/**
  * returns scaled image dimensions that fit into a bounding box
  * only scales down
  * takes into account the device pixel ratio
  * @param {number} oWidth The original image width.
  * @param {number} oHeight The original image height.
  * @param {number} maxWidth The bounding box width.
  * @param {number} maxHeight The bounding box height.
  * @return {number} width A scaled width value
  * @return {number} height A scaled height value
  */
export function scaleSoftDown(oWidth, oHeight, maxWidth, maxHeight) {
  const wImg = oWidth;
  const hImg = oHeight;
  const wMax = maxWidth;
  const hMax = maxHeight;

  const wFactor = wMax / wImg;
  const hFactor = hMax / hImg;

  let factor = Math.min(wFactor, hFactor);

  // limit upscaling to 1x, be aware of devicePixelRatio
  const deviceRatio = window.devicePixelRatio;
  factor = Math.min(factor, 1 / deviceRatio);

  const wTarget = wImg * factor;
  const hTarget = hImg * factor;

  return {
    width: wTarget,
    height: hTarget
  };
}
