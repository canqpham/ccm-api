import AssignIssue from '../models/assignIssue.model';

class AssignIssueRepository {
  constructor() { }

  create = async (data) => {
    const assignIssue = await AssignIssue.create(data);
    // return assignIssue.populate('assignee')
    return assignIssue;
  }

  getAssignIssue = async (data) => {
    const assignIssue = await AssignIssue.findOne(data).populate('assignee issue')
    return assignIssue
  }

  update = async (id, data) => {
      const assignIssue = await AssignIssue.findByIdAndUpdate(id, data)
      return assignIssue
  }

  getListAll = async () => {
      const assignIssues = await AssignIssue.find()
      return assignIssues
  }

  getListAssignByIssue = async (id) => {
      const assignIssues = await AssignIssue.find({issue: id}).populate('assignee')
      return assignIssues
  }

  remove = async id => {
    const assignIssue = await AssignIssue.findByIdAndRemove(id)
    return assignIssue
  }
}

export default AssignIssueRepository;