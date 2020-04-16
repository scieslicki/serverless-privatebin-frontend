import config from '../config';

export function standarizePassword(password) {
  if (password.length < 32) {
    const missingPart = config.defaultPassword.slice(-(32 - password.length));

    return password + missingPart;
  }

  if (password.length > 32){
    return password.slice(-32);
  }

  return password;
}
