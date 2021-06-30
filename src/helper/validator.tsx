import validator from 'validator';

export const validateEmail = (email: string) => {
  const valid = validator.isEmail(email);
  return valid ? true : false;
};
