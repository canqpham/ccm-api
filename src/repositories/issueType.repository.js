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
      await IssueType.findByIdAndUpdate(id, data)
      const issueType = await IssueType.findById(id)
      return issueType
  }

  getListAll = async () => {
      const issueTypes = await IssueType.find()
      return issueTypes
  }

  remove = async (id) => {
    const issueType = await IssueType.findByIdAndRemove(id)
    return issueType
  }
}

export default IssueTypeRepository;