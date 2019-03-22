import User from '../models/user.model';
import NotFoundException from '../errors/not-found.error';

class UserRepository {
  constructor() { }

  handlerLogin = async (email, password) => {
    // console.log(email)
    const user = await User.findOne({ email });
    // console.log(user)
    if (!user) throw new NotFoundException('USER_NAME_NOT_FOUND');
    const isPassValid = user.comparePassword(password);
    if (!isPassValid) return false;
    return user;
  }

  handlerRegister = async (email, password) => {
    let user = await User.findOne({ email });
    if(user) {
      return false;
    }
    user = await User.create({ email, password });
    return user;
  }
}

export default UserRepository;