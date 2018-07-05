import passport from 'passport';

import { ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy } from 'passport-jwt';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { OAuthStrategy as GoogleStrategy } from 'passport-google-oauth';

import { Users } from './models';

const UserModel = new Users();

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, verifyLocalStrategy));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
}, verifyJWTStrategy));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: 'http://localhost:8080/auth/facebook/callback'
}, verifySocialStrategy));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CONSUMER_KEY,
  consumerSecret: process.env.GOOGLE_CONSUMER_SECRET,
  callbackURL: 'http://localhost:8080/auth/google/callback'
}, verifySocialStrategy));

passport.use(new TwitterStrategy({
  clientID: process.env.TWITTER_CLIENT_ID,
  clientSecret: process.env.TWITTER_CLIENT_SECRET,
  callbackURL: 'http://localhost:8080/auth/twitter/callback'
}, verifySocialStrategy));

async function verifyLocalStrategy(email, password, cb) {
  try {
    const user = await UserModel.findOne({ email, password });

    if (!user) {
      return cb(null, false, { message: 'Incorrect email or password.' });
    }

    return cb(null, user, { message: 'Logged in successfully.' });
  } catch (e) {
    return cb(e);
  }
}

async function verifyJWTStrategy(jwtPayload, cb) {
  try {
    const user = await UserModel.findOneById(jwtPayload.id);

    if (user) return cb(null, user);
  } catch (e) {
    return cb(e);
  }
}

async function verifySocialStrategy(accessToken, refreshToken, profile, cb) {
  try {
    const user = await UserModel.findOrCreate({ id: profile.id });
    return cb(null, user);
  } catch (e) {
    return cb(e);
  }
}

export default passport;