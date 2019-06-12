import Issue from "../models/issue.model";
import mongoose from "mongoose";
import helper from '../utils/helper';
import ProjectModel from "../models/project.model";
import ProjectMemberModel from "../models/projectMember.model";

class IssueRepository {
  constructor() {}

  create = async data => {
    const issue = await Issue.create(data);
    return issue;
  };

  update = async (id, data) => {
    // console.log(id)
    await Issue.findOneAndUpdate({ _id: id }, data);

    const issue = Issue.findOne({ _id: id });
    // console.log(Object(issue))
    return issue;
  };

  getListIssueByParams = async (data) => {
    const result = await Issue.find(data)
    return result
  }

  getListByParams = async (params) => {
    const [result, count] = await helper.getListItem(Issue, params)
    return [result, count]
}

  getAllIssueByProjectId = async id => {
    const issues = await Issue.find({ project: id });
    return issues;
  };

  getIssue = async data => {
    const issue = await Issue.findOne(data);
    return issue;
  };

  getIssueInfo = async id => {
    const issue = await Issue.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id)
        }
      },
      {
        $lookup: {
          from: 'workflow',
          localField: "workflow",
          foreignField: "_id",
          // pipeline: [
          //   // { $match: { _id: 'workflow' } },
          //   { $project: { name: "$name" } }
          // ],
          as: 'workflow'
        },
      },
      {
        $lookup: {
          from: 'issueTypes',
          localField: "issueType",
          foreignField: "_id",
          as: 'issueType'
        },
      },
      {
        $lookup: {
          from: 'sprints',
          localField: "sprint",
          foreignField: "_id",
          as: 'sprint'
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: "creator",
          foreignField: "_id",
          as: 'creator'
        },
      },
      // {
      //   $lookup: {
      //     from: 'components',
      //     localField: "component",
      //     foreignField: "_id",
      //     as: 'component'
      //   },
      // },
      {
        $addFields: { 
          workflow: {
            $arrayElemAt: [ '$workflow', 0 ]
          },
          issueType: {
            $arrayElemAt: [ '$issueType', 0 ]
          },
          sprint: {
            $arrayElemAt: [ '$sprint', 0 ]
          },
          creator: {
            $arrayElemAt: [ '$creator', 0 ]
          },
        }
      },
      {
        $lookup: {
          from: "assignIssues",
          pipeline: [
            { $match: { issue: mongoose.Types.ObjectId(id) } },
            { $project: { member: "$assignee" } }
          ],
          as: "assignees"
        }
      },
      {
        $addFields: {
          numberOfAssignee: {
            $cond: {
              if: { $isArray: "$assignees" },
              then: { $size: "$assignees" },
              else: "NA"
            }
          }
        }
      },
      {
        $lookup: {
          from: "comments",
          pipeline: [
            { $match: { issue: mongoose.Types.ObjectId(id) } },
            {
              $project: {
                creator: "$creator",
                content: "$content",
                image: "$image",
                attach: "$attach",
                tagMembers: "$tagMembers",
                tagIssues: "$tagIssues"
              }
            }
          ],
          as: "comments"
        },
      },
      {
        $unwind: {
          path: "$comments",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: "comments.creator",
          foreignField: "_id",
          as: 'comments.creator'
        },
      },
      {
        $lookup: {
          from: "activities",
          pipeline: [
            { $match: { issue: mongoose.Types.ObjectId(id) } },
            { $sort: { createdAt: -1}}
          ],
          as: "activities"
        }
      },
      {
        $lookup: {
          from: 'issues',
          localField: '_id',
          foreignField: "subTaskOfIssue",
          as: "subtasks"
        }
      },
      {
        $unwind: {
          path: "$subtasks",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'issueTypes',
          localField: 'subtasks.issueType',
          foreignField: "_id",
          as: "subtasks.issueType"
        }
      },
      {
        $lookup: {
          from: 'priorities',
          localField: 'subtasks.priority',
          foreignField: "_id",
          as: "subtasks.priority"
        }
      },
      {
        $lookup: {
          from: 'workflow',
          localField: 'subtasks.workflow',
          foreignField: "_id",
          as: "subtasks.workflow"
        }
      },
      {
        $addFields: {
          "subtasks.issueType": {
            $arrayElemAt: ['$subtasks.issueType', 0]
          },
          "subtasks.priority": {
            $arrayElemAt: ['$subtasks.priority', 0]
          },
          "subtasks.workflow": {
            $arrayElemAt: ['$subtasks.workflow', 0]
          },
          "comments.creator": {
            $arrayElemAt: ['$comments.creator', 0]
          },
        }
      },
      { 
        $group: { 
          _id: "$_id",
          subtasks: { $push: "$subtasks" },
          assignee: { $first: "$assignee" },
          version: { $first: "$version" },
          sprint: { $first: "$sprint" },
          sprintHistory: { $first: "$sprintHistory" },
          attachs: { $first: "$attachs" },
          component: { $first: "$component" },
          label: { $first: "$label" },
          closed: { $first: "$closed" },
          project: { $first: "$project" },
          description: { $first: "$description" },
          summary: { $first: "$summary" },
          issueType: { $first: "$issueType" },
          priority: { $first: "$priority" },
          storyPoints: { $first: "$storyPoints" },
          creator: { $first: "$creator" },
          workflow: { $first: "$workflow" },
          issueKey: { $first: "$issueKey" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          numberOfAssignee: { $first: "$numberOfAssignee" },
          comments: { $push: "$comments" },
          activities: { $first: "$activities" },
        } 
      }
    ]);
    // let result  = issue.populate('workflow')
    return issue[0];
  };

  remove = async id => {
    const issue = await Issue.findByIdAndRemove(id);
    return issue;
  };

  
}

export default IssueRepository;
