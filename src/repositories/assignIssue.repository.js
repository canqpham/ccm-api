import AssignIssue from '../models/assignIssue.model';

class AssignIssueRepository {
  constructor() { }

  create = async (data) => {
    const assignIssue = await AssignIssue.create(data);
    return assignIssue;
  }

  getAssignIssue = async (data) => {
    const assignIssue = await AssignIssue.findOne(data)
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
}

export default AssignIssueRepository;