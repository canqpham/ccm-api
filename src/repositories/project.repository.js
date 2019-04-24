import Project from '../models/project.model';

class ProjectRepository {
  constructor() { }

  create = async (data) => {
    const project = await Project.create( data );
    return project;
  }

  update = async (id, data) => {
    await Project.findByIdAndUpdate(id, data)
    const project = await Project.findById(id)
    return project
  }

  getProjectById = async (id) => {
    const project = await Project.findById(id)
    return project
  }

  getProjectByParams = async (data) => {
    const project = await Project.findOne(data)
    return project
  }
}

export default ProjectRepository;