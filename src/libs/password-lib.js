import config from '../config';

export async function standarizePassword(userId, password) {
  const crypto = require('crypto');

  const newPassword = await crypto
    .createHash('SHA1')
    .update(userId + password + config.defaultPassword)
    .digest('hex');

  return await newPassword.slice(0,32);
}
