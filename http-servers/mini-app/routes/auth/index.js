import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const auth = express.Router();

auth.post('/', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(404).json({
        message: "Not Found",
        info
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) return res.send(err);

      const token = jwt.sign(user, 'secret', { expiresIn: '10m' });
      return res.status(200).json({ data: { user }, token, info });
    })
  })(req, res);
});

auth.get('/facebook', passport.authenticate('facebook'));
auth.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/someURL' }),
  (req, res) => {
    res.redirect('/');
  }
);

auth.get('/google', passport.authenticate('google', { scope: ['profile'] }));
auth.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/someURL' }),
  (req, res) => {
    res.redirect('/');
  }
);

auth.get('/twitter', passport.authenticate('twitter'));
auth.get('/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/someURL' }),
  (req, res) => {
    res.redirect('/');
  }
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

export default auth;