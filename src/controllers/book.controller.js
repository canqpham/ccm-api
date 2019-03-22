import BookRepository from '../repositories/book.repository';

const bookRepository = new BookRepository();

class BookController {
    create = async (req, res, next) => {
        let { title, author } = req.body;
        try {
            //handler login
            let book = await bookRepository.create(title, author);
            if (!book) throw new Error("Can't create book");
      
            //Initialize token
            // let token = await this._signToken(user);
            return res.json({ book });
          } catch (error) {
            console.log('error.status: ', error.status)
            return res.status(error.status || 500).json({
              message: error.message
            });
          }
    }
}

export default BookController;