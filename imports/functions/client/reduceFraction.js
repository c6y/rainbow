/**
  * Reduce a fraction by finding the Greatest Common Divisor and dividing by it.
  * @param {number} numerator The original numerator
  * @param {number} denominator The original denominator
  * @return {number} reduced numerator
  * @return {number} reduced denominator
  */
export function reduceFraction(numerator, denominator) {
  let gcd = function gcd(a, b) {
    return b ? gcd(b, a % b) : a;
  };
  gcd = gcd(numerator, denominator);
  return {
    numerator: numerator / gcd,
    denominator: denominator / gcd,
  };
}
