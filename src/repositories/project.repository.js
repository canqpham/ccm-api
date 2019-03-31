import Project from '../models/project.model';
import Group from '../models/group.model';
import User from '../models/user.model';

import NotFoundException from '../errors/not-found.error';

class ProjectRepository {
  constructor() { }

  create = async (data) => {
    const group = await Group.findOne({level: 0});
    data = {
      ...data,
      members: [
        {
          member: data.lead,
          group: group._id
        }
      ]
    }
    const project = await Project.create( data );
    await User.findByIdAndUpdate(data.lead, {projects: [ {project: project._id}]})
    // if (!user) throw new NotFoundException('USER_NAME_NOT_FOUND');
    // const isPassValid = user.comparePassword(password);
    // if (!isPassValid) return false;
    return project;
  }

  getListByUserId = async (userId) => {
    const projects = await Project.find()
  }

//   handlerRegister = async (email, password) => {
//     let user = await User.findOne({ email });
//     if(user) {
//       return false;
//     }
//     user = await User.create({ email, password });
//     return user;
//   }
}

export default ProjectRepository;