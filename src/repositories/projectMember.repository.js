import ProjectMember from '../models/projectMember.model'
import helper from '../utils/helper';
import mongoose from 'mongoose';

class ProjectMemberRepository {
    constructor() { }

    create = async (data) => {
        const projectMember = await ProjectMember.create(data)
        return projectMember
    }

    getByParams = async (data) => {
        const result = await ProjectMember.findOne(data)
        .populate({
            path: 'project member '
        })
        // console.log('repos', result)
        return result
    }

    getListProjectDashboard = async userId => {
        const results = await ProjectMember.aggregate([
          {
            $match: {
              member: mongoose.Types.ObjectId(userId)
            }
          },
          {
            $lookup: {
              from: "projects",
              localField: "project",
              foreignField: "_id",
              as: "project"
            }
          },
          {
            $unwind: "$project"
          },
          {
            $lookup: {
              from: "issues",
              localField: "project._id",
              foreignField: "project",
              as: "issues"
            }
          },
          {
            $unwind: {
              path: "$issues",
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $lookup: {
              from: "workflow",
              localField: "issues.workflow",
              foreignField: "_id",
              as: "issues.workflow"
            }
          },
          {
            $unwind: {
              path: "$issues.workflow",
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $group: {
              _id: "$_id",
              issues: { $push: "$issues"},
              project: { $first: "$project" }
            }
          },
          {
            $project:  {
              project: "$project",
              count: {
                toDo: {
                  $size: {
                    $filter: {
                      input: "$issues",
                      as: "issue",
                      cond: { $eq: ["$$issue.workflow.type", "TODO"] }
                    }
                  }
                },
                inProgress: {
                  $size: {
                    $filter: {
                      input: "$issues",
                      as: "issue",
                      cond: { $eq: ["$$issue.workflow.type", "INPROGRESS"] }
                    }
                  }
                },
                done: {
                  $size: {
                    $filter: {
                      input: "$issues",
                      as: "issue",
                      cond: { $eq: ["$$issue.workflow.type", "DONE"] }
                    }
                  }
                },
              }
            }
          }
        ])
        return [results, {}];
      }

    // getListByParams = async (data) => {
    //     const result = await ProjectMember.find(data).populate({
    //         path: 'member project group'
    //     }).sort('-updatedAt')
    //     return result
    // }

    update = async (id, data) => {
      const result = await ProjectMember.findByIdAndUpdate(id, data)
      return result
    }

    getListByParams= async (data) => {
        const result = await ProjectMember.find(data).populate('member')
        return result
    }

    getListUserByProjectId = async (id) => {
        const result = await ProjectMember.find({project: id}).sort('-updatedAt')
        return result
    }

    remove = async (id) => {
        const result = await ProjectMember.findByIdAndRemove(id)
        return result
    }
}

export default ProjectMemberRepository