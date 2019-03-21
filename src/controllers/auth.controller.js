import JWT from 'jsonwebtoken';
import passport from 'passport';
import UserRepository from '../repositories/user.repository';

const userRepository = new UserRepository();

class AuthController {
  login = async (req, res, next) => {
    let { email, password } = req.body;
    try {
      //handler login
      let user = await userRepository.handlerLogin(email, password);
      if (!user) throw new Error("Password incorrect.");

      //Initialize token
      let token = await this._signToken(user);
      return res.json({ token });
    } catch (error) {
      return res.status(error.status).json({
        message: error.message
      });
    }
  }

  _signToken = async (user) => {
    return JWT.sign(
      {
        iss: "phamcang",
        sub: user._id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
      },
      secret.SECRET_KEY
    );
  }

}

export default AuthController;