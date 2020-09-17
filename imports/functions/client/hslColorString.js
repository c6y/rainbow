/**
 * Return a HSL string of a color.
 * @param {Object} color The color object.
 * @return {string} The HSL color string.
 */
export function hslColorString(color) {
  let hslString;
  if (color) {
    hslString = String(
        'hsl(' +
        color.hue + ', ' +
        color.saturation + '%, ' +
        color.luminosity + '%)',
    );
  } else {
    hslString = 'hsl(0, 50%, 50%)';
  };
  return hslString;
}
