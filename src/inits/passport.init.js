import passport from 'passport';
import JwtPassport from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { AuthConfig } from '../../configs/index';
import User from '../models/user.model';
passport.use(
  new JwtPassport.Strategy({
    jwtFromRequest: ExtractJwt.fromHeader('access-token'),
    secretOrKey: AuthConfig.SECRET_KEY
  },
    async (payload, done) => {
      try {
        //Find user in DB
        const user = await User.findById(payload.sub);
        if (!user) return done(null, false);
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  ));