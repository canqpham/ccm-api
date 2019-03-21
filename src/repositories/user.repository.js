import User from '../models/user.model';
import NotFoundException from '../errors/not-found.error';

class UserRepository {
  constructor() { }

  handlerLogin = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new NotFoundException('USER_NAME_NOT_FOUND');
    const isPassValid = user.comparePassword(password);
    if (!isPassValid) return false;
    return user;
  }

}

export default UserRepository;