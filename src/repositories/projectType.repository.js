import ProjectType from '../models/projectType.model';

class ProjectTypeRepository {
  constructor() { }

  create = async (data) => {
    const projectType = await ProjectType.create(data);
    return projectType;
  }

  getProjectType = async (data) => {
    const projectType = await ProjectType.findOne(data)
    return projectType
  }

  update = async (id, data) => {
      const projectType = await ProjectType.findByIdAndUpdate(id, data)
      return projectType
  }

  getListAll = async () => {
      const projectTypes = await ProjectType.find()
      return projectTypes
  }
}

export default ProjectTypeRepository;