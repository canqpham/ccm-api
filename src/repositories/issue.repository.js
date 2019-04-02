import Issue from '../models/issue.model';
import NotFoundException from '../errors/not-found.error';

class IssueRepository {
  constructor() { }

  create = async (data) => {
    const issue = await Issue.create(data);
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

export default IssueRepository;