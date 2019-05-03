import ProjectMember from '../models/projectMember.model'
import helper from '../utils/helper';
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

    getListByParams= async (params) => {
        const [result, count] = await helper.getListItem(ProjectMember, params)
        return [result, count]
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