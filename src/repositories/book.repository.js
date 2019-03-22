import Book from '../models/book.model';
import NotFoundException from '../errors/not-found.error';

class BookRepository {
  constructor() { }

  create = async (title, author) => {

    const book = await Book.create({ title, author });
    // if (!user) throw new NotFoundException('USER_NAME_NOT_FOUND');
    // const isPassValid = user.comparePassword(password);
    // if (!isPassValid) return false;
    return book;
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