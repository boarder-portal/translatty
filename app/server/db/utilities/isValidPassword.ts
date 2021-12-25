import crypto from 'crypto';

export async function isValidPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(':');

    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) {
        reject(err);
      }

      resolve(key === derivedKey.toString('hex'));
    });
  });
}
