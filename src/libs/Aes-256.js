/**
 * @fileoverview Provides easy encryption/decryption methods using AES 256 GCM.
 */

'use strict';

const crypto = require('crypto');
var zlib = require('zlib');

const ALGORITHM = 'aes-256-gcm';
const BLOCK_SIZE_BYTES = 16; // 128 bit

// compression methods
const NONE = 'none';
const INFLATE ='inflate';
const GZIP = 'gzip';

// encodings
const UTF8 = 'utf8';
const BASE64 = 'base64';

function compress(text, compression) {
  console.log(text.length, compression);

  if (compression === NONE) {
    return text;
  }

  if (compression === GZIP) {
    return zlib.gzipSync(text).toString(BASE64);
  }

  if (compression === INFLATE) {
    return zlib.deflateSync(text).toString(BASE64);
  }
}

function decompress(data, compression) {
  if (compression === NONE) {
    return data;
  }

  if (compression === GZIP) {
    return zlib.gunzipSync(new Buffer(data, BASE64)).toString();
  }

  if (compression === INFLATE) {
    return zlib.inflateSync(new Buffer(data, BASE64)).toString();
  }
}

/**
 * Encrypts text with AES 256 GCM.
 * @param {string} text - Cleartext to encode.
 * @param {string} secret - Shared secret key, must be 32 bytes.
 * @returns {object}
 */
export function encrypt(text, secret, compression = INFLATE) {
  if (text.length < 100) {
    console.log(text.length);

    compression = NONE;
  }
  let compressed = compress(text, compression);

  console.log(compressed, compression);

  const iv = crypto.randomBytes(BLOCK_SIZE_BYTES);
  const cipher = crypto.createCipheriv(ALGORITHM, secret, iv);

  let ciphertext = cipher.update(compressed, UTF8, BASE64);
  ciphertext += cipher.final(BASE64);

  return {
    ciphertext,
    iv: iv.toString(BASE64),
    tag: cipher.getAuthTag().toString(BASE64),
    compression,
  };
}

/**
 * Decrypts AES 256 CGM encrypted text.
 * @param {string} ciphertext - Base64-encoded ciphertext.
 * @param {string} iv - The base64-encoded initialization vector.
 * @param {string} tag - The base64-encoded authentication tag generated by getAuthTag().
 * @param {string} secret - Shared secret key, must be 32 bytes.
 * @returns {string}
 */
export function decrypt(ciphertext, iv, tag, secret, compression = INFLATE) {
  const decipher = crypto.createDecipheriv(ALGORITHM, secret, Buffer.from(iv, BASE64));
  decipher.setAuthTag(Buffer.from(tag, BASE64));

  let cleartext = decipher.update(ciphertext, BASE64, UTF8);
  cleartext += decipher.final(UTF8);

  return decompress(cleartext, compression);
}