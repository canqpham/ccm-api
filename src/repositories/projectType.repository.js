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
      await ProjectType.findByIdAndUpdate(id, data)
      const projectType = await ProjectType.findById(id)
      return projectType
  }

  getListAll = async () => {
      const projectTypes = await ProjectType.find()
      return projectTypes
  }

  remove = async id => {
    const projectType = await ProjectType.findByIdAndRemove(id)
    return projectType
  }
}

export default ProjectTypeRepository;