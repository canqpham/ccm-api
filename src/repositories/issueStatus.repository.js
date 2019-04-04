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
      const issueStatus = await IssueStatus.findByIdAndUpdate(id, data)
      return issueStatus
  }

  getListAll = async () => {
      const issueStatuses = await IssueStatus.find()
      return issueStatuses
  }
}

export default IssueStatusRepository;