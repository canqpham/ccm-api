import IssueType from '../models/issueType.model';
import helper from '../utils/helper';
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

  getListByParams = async (params) => {
    const [result, count] = await helper.getListItem(IssueType, params)
    return [result, count]
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