import ProjectMember from '../models/projectMember.model'

class ProjectMemberRepository {
    constructor() { }

    create = async (data) => {
        const projectMember = await ProjectMember.create(data)
        return projectMember
    }

    getListByUserId = async (id) => {
        const result = await ProjectMember.find({member: id}).populate('project').sort('-updatedAt')
        return result
    }

    getListUserByProjectId = async (id) => {
        const result = await ProjectMember.find({project: id})
        return result
    }
}

export default ProjectMemberRepository