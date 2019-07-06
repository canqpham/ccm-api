import JWT from 'jsonwebtoken';
import passport from 'passport';
import { AuthConfig } from '../../configs/auth';
import UserRepository from '../repositories/user.repository';
import {RequestResponse} from '../utils/common'
const userRepository = new UserRepository();

class AuthController {
  login = async (req, res, next) => {
    let { email, password } = req.body;
    try {
      //handler login
      const isExist = await userRepository.getUserByParams({email})
      if(!isExist) throw new Error('Email or password is incorrect !');
      let user = await userRepository.handlerLogin(email, password);
      if (!user) throw new Error("Password incorrect.");
      //Initialize token
      let token = await this._signToken(user);
      return res.json({ token });
    } catch (error) {
      return res.json(new RequestResponse({
        statusCode: 400,
        success: false,
        error
      }))
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
      AuthConfig.SECRET_KEY
    );
  }

}

export default AuthController;