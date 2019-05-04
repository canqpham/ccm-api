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

    // getListByParams = async (data) => {
    //     const result = await ProjectMember.find(data).populate({
    //         path: 'member project group'
    //     }).sort('-updatedAt')
    //     return result
    // }

    getListByParams= async (userId) => {
        const result = await ProjectMember.aggregate([
            {
                $match: {
                    member: mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: 'workflow',
                    localField: "project",
                    foreignField: "project",
                    as: 'workflow'
                },
            },
            {
                $lookup: {
                    from: 'projects',
                    localField: "project",
                    foreignField: "_id",
                    as: 'project'
                },
            },
            {
                $unwind: '$project'
            },
            {
                $lookup: {
                    from: 'issues',
                    localField: "project._id",
                    foreignField: "project",
                    as: 'issues'
                }
            }
            
        ])
        return [result, {}]
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