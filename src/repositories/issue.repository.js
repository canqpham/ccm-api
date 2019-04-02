import Issue from '../models/user.model';
import NotFoundException from '../errors/not-found.error';

class BookRepository {
  constructor() { }

  create = async (data) => {

    const issue = await Issue.create(data);
    // if (!user) throw new NotFoundException('USER_NAME_NOT_FOUND');
    // const isPassValid = user.comparePassword(password);
    // if (!isPassValid) return false;
    return issue;
  }

  update = async (id, data) => {
      const issue = await Issue.findByIdAndUpdate(id, data)
      return issue
  }

//   handlerRegister = async (email, password) => {
//     let user = await User.findOne({ email });
//     if(user) {
//       return false;
//     }
//     user = await User.create({ email, password });
//     return user;
//   }
}

export default BookRepository;