import validate from 'validate.js';

export function uppercaseLetter(value, options) {
  if (/.*[A-Z].*/.test(value)) return undefined;
  return options.message || 'must have an uppercase letter';
}
export function lowercaseLetter(value, options) {
  if (/.*[a-z].*/.test(value)) return undefined;
  return options.message || 'must have a lowercase letter';
}
export function specialCharacter(value, options) {
  if (/.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*/.test(value)) return undefined;
  return options.message || 'must have a special character';
}
export function number(value, options) {
  if (/.*[0-9].*/.test(value)) return undefined;
  return options.message || 'must have a number';
}
export function firstIsCapital(value, options) {
  if (/^[A-Z]/.test(value)) return undefined;
  return options.message || 'must begin with capital letter';
}
// If you use any of these, be sure to use the corresponding line found below.
validate.validators.lowercaseLetter = lowercaseLetter;
validate.validators.specialCharacter = specialCharacter;
validate.validators.number = number;
validate.validators.uppercaseLetter = uppercaseLetter;
validate.validators.firstIsCapital = firstIsCapital;