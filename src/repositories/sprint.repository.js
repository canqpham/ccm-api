import Sprint from '../models/sprints.model'
import mongoose from 'mongoose'

class SprintRepository {
  constructor() {}

  create = async (data) => {
    const sprint = await Sprint.create(data)
    return sprint
  }

  update = async (id, data) => {
    await Sprint.findByIdAndUpdate(id, data)
    const sprint = await this.getSprintById(id)
    return sprint
  }

  getSprintById = async (id) => {
    const sprint = await Sprint.aggregate([
      {
        $match: {
        "_id": mongoose.Types.ObjectId(id)
        },
      },
      {
        $lookup: {
          from: 'issues',
          localField: '_id',
          foreignField: 'sprint',
          as: "issues",
        },
        // $group: {
        //   _id: "issueStatus",
        //   count: { $sum: 1 }
        // },
        
      },
      {
        $lookup: {
          from: 'workflow',
          localField: '_id',
          foreignField: 'sprint',
          as: "boards",
        },
        // $group: {
        //   _id: "issueStatus",
        //   count: { $sum: 1 }
        // },
        
      },
      {
        $addFields: {
          //  item: 1,
           numberOfTodo: { $cond: { if: { $isArray: "$issues" }, then: { $size: "$issues" }, else: "NA"} }
        }
      }
      // {
      //   $lookup: {
      //     from: 'issues',
      //     localField: '_id',
      //     foreignField: 'sprint',

      //     as: "numberOfIssueStatus",
      //   }
      // }
    ])
    return sprint
  }

  getSprintActiveInProject = async (data) => {
    const sprint = await Sprint.aggregate([
      {
        $match: {
        "project": mongoose.Types.ObjectId(data.project),
        "active": data.active
        },
      },
      {
        $lookup: {
          from: 'issues',
          localField: '_id',
          foreignField: 'sprint',
          as: "issues",
        },
        // $group: {
        //   _id: "issueStatus",
        //   count: { $sum: 1 }
        // },
        
      },
      {
        $lookup: {
          from: 'workflow',
          localField: '_id',
          foreignField: 'sprint',
          as: "boards",
        },
        // $group: {
        //   _id: "issueStatus",
        //   count: { $sum: 1 }
        // },
        
      },
      {
        $addFields: {
          //  item: 1,
           numberOfTodo: { $cond: { if: { $isArray: "$issues" }, then: { $size: "$issues" }, else: "NA"} }
        }
      }
      // {
      //   $lookup: {
      //     from: 'issues',
      //     localField: '_id',
      //     foreignField: 'sprint',

      //     as: "numberOfIssueStatus",
      //   }
      // }
    ])
    return sprint
  }

  getListAll = async () => {
    const sprints = await Sprint.find()
    return sprints
  }

  getListSprintByParams = async (params) => {
    const sprints = await Sprint.aggregate([
      {
        $match: {
        "project": mongoose.Types.ObjectId(params.project),
        "completed": params.completed
        },
      },
    ])
    // console.log(sprints)
    return sprints
  }

  remove = async (id) => {
    const sprint = await Sprint.findByIdAndRemove(id)
    return sprint
  }
}

export default SprintRepository