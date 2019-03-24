import UserRepository from '../repositories/user.repository';

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
            return res.json({ user });
          } catch (error) {
            console.log('error.status: ', error.status)
            return res.status(error.status || 500).json({
              message: error.message
            });
          }
    }
}

export default UserController;