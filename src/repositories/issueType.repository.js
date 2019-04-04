import IssueType from '../models/issueType.model';

class IssueTypeRepository {
  constructor() { }

  create = async (data) => {
    const issueType = await IssueType.create(data);
    return issueType;
  }

  getIssueType = async (data) => {
    const issueType = await IssueType.findOne(data)
    return issueType
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

export default IssueTypeRepository;