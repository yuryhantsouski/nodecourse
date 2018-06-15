import url from 'url';
import querystring from 'querystring';

export const queryParser = (req, res, next) => {
  const { query } = url.parse(req.url);
  req.parsedQuery = querystring.parse(query);
  next();
};