import UserRepository from '../repositories/user.repository';
import { RequestResponse } from '../utils/common';

const userRepository = new UserRepository();
class UserController {
    register = async (req, res, next) => {
        let data = req.body;
        try {
            //handler login
            let user = await userRepository.handlerRegister(data);
            if (!user) throw new Error("Email is exist");
      
            //Initialize token
            // let token = await this._signToken(user);
            return res.json(new RequestResponse({
              data: user,
              statusCode: 200
            }));
          } catch (error) {
            return res.json(new RequestResponse({
              error,
              statusCode: 400,
              success: false
            }));
          }
    }

    getInfo = async (req, res, next) => {
      let _id = req.userId;
      try {
        let user = await userRepository.getUserInfo(_id)
        if(!user) throw new Error("User not found !")
        return res.json( new RequestResponse({
          data: user,
          statusCode: 200
        }))
      } catch (error) {
        return res.json( new RequestResponse({
          success: false,
          statusCode: 400,
          error
        }))
      }
    }
}

export default UserController;