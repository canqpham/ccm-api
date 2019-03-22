var passport = require('passport');
const authenticate = () => {
  return async function(req, res, next) {
    passport.authenticate('jwt', (error, user) => {
      if (!error && user) {
        // data after decode
        req.userId = user._id;
        next();
        // return user._id;
      } else {
        return res.status(404).json({
          success: false,
          message:
            error && error.message ? error.message : 'AUTHENTICATION_FAILED',
          result: {}
        });
      }
    })(req, res, next);
  };
};
export default authenticate;
