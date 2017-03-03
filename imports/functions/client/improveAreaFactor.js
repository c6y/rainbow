/**
  * Calculates how much of the thumbnail Box is actually covered by the image
  * if the area coverage is lower than the threshold, the factor is increased
  * @param {int} factor The original factor.
  * @param {number} imgW The original image width.
  * @param {number} imgH The original image width.
  * @param {number} wBox The original image width.
  * @param {number} hBox The original image width.
  * @param {string} name The original name of the file.
  * @return {int} factor the new factor
  */
export function improveAreaFactor(factor, imgW, imgH, wBox, hBox, name) {
  const scaledImage = imgW * imgH * factor * factor;
  const boxArea = wBox * hBox;
  const usedArea = Math.round(scaledImage / boxArea * 100) / 100;

  // Use a different threshold for images
  // where one side is very much longer than the other
  const imageProportion = Math.max(imgW, imgH) / Math.min(imgW, imgH);
  let threshold = 0.2;
  if (imageProportion < 3) {
    threshold += 0.2;
  }

  // Scale image by an additional factor
  // if larger areas of the canvas are not covered
  if (usedArea < threshold) {
    // console.log(name + ': ' + threshold + ': ' + imageProportion);
    // console.log(name + ': usedArea:' + usedArea + ', old factor:' + factor);
    return factor + 1;
  }
  return factor;
}
