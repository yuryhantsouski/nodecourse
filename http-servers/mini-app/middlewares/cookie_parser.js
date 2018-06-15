export const cookieParser = (req, res, next) => {
  const { cookie } = req.headers;
  const hashes = cookie ? cookie.split(';') : [];
  req.parsedCookies = hashes.reduce((acc, hash) => {
    const [ key, val ] = hash.split('=');
    return {
      ...acc,
      [key]: val
    }
  }, {});
  next();
};