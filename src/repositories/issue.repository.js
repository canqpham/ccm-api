import Issue from '../models/issue.model';
import mongoose from "mongoose";
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

  getIssueInfo = async (id) => {
    const issue = await Issue.aggregate([
      {
        $match: {
        "_id": mongoose.Types.ObjectId(id)
        }
      },
      {
        $lookup: {
          from: 'assignIssues',
          localField: '_id',
          foreignField: 'issue',
          pipeline: [
            {
              $match: {
                "active": true,
              },
            },
            {
              $lookup: {
                from: 'users',
                localField: 'assignee',
                foreignField: '_id',
                as: 'user'
              }
            }
          ],
          as: "assignees",
        },
      },
    ])
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