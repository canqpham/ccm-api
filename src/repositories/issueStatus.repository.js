import IssueStatus from '../models/issueStatus.model';
import NotFoundException from '../errors/not-found.error';

class IssueStatusRepository {
  constructor() { }

  create = async (data) => {
    const {status} = data;
    const temp = await IssueStatus.findOne({status})
    if(temp) return null;
    const issueStatus = await IssueStatus.create(data);
    return issueStatus;
  }

  update = async (id, data) => {
      const issueStatus = await IssueStatus.findByIdAndUpdate(id, data)
      return issueStatus
  }

  getListAll = async () => {
      const issueStatuses = await IssueStatus.find()
      return issueStatuses
  }
}

export default IssueStatusRepository;