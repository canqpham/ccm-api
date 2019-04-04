import Project from '../models/project.model';

class ProjectRepository {
  constructor() { }

  create = async (data) => {
    const project = await Project.create( data );
    return project;
  }

  update = async (id, data) => {
    const project = await Project.findByIdAndUpdate(id, data)
    return project
  }
}

export default ProjectRepository;