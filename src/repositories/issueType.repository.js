import IssueType from '../models/issueType.model';
import NotFoundException from '../errors/not-found.error';

class BookRepository {
  constructor() { }

  create = async (data) => {
    const {type} = data;
    const temp = await IssueType.findOne({type})
    if(temp) return null;
    const issueType = await IssueType.create(data);
    return issueType;
  }

  update = async (id, data) => {
      const issueType = await IssueType.findByIdAndUpdate(id, data)
      return issueType
  }

  getListAll = async () => {
      const issueTypes = await IssueType.find()
      return issueTypes
  }
}

export default BookRepository;