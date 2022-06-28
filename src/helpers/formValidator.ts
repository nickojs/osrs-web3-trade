/* eslint-disable indent */
export const generateErrorLabel = (
  errorType: string,
  field: string,
  minLength?: number,
  maxLength?: number
) => {
  switch (errorType) {
    case 'required':
      return `${field} is required`;
    case 'minLength':
    case 'maxLength':
      return `${field} should have between ${minLength} and ${maxLength} characters`;
    default:
      throw new Error('[loginScreen] Unknown error type provided');
  }
};
