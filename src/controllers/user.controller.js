import UserRepository from '../repositories/user.repository';

const userRepository = new UserRepository();
class UserController {
    register = async (req, res, next) => {
        let { email, password } = req.body;
        try {
            //handler login
            let user = await userRepository.handlerRegister(email, password);
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