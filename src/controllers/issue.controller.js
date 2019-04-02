import IssueRepository from '../repositories/issue.repository';

const issueRepository = new IssueRepository();

class IssueController {
    create = async (req, res, next) => {
        let data = req.body;
        let userId = req.userId;

        try {
            //handler login
            data = {
                ...data,
                creator: userId,
            }
            let book = await issueRepository.create(data);
            if (!book) throw new Error("Can't create issue");
      
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

export default IssueController;