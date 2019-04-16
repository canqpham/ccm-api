import IssueStatus from '../models/issueStatus.model';

class IssueStatusRepository {
  constructor() { }

  create = async (data) => {
    const issueStatus = await IssueStatus.create(data);
    return issueStatus;
  }

  getIssueStatus = async (data) => {
    const issueStatus = await IssueStatus.findOne(data)
    return issueStatus
  }

  update = async (id, data) => {
      await IssueStatus.findByIdAndUpdate(id, data)
      const issueStatus = await IssueStatus.findById(id)
      return issueStatus
  }

  getListAll = async () => {
      const issueStatuses = await IssueStatus.find()
      return issueStatuses
  }

  remove = async (id) => {
    const issueStatus = await IssueStatus.findByIdAndRemove(id)
    return issueStatus
  }
}

export default IssueStatusRepository;