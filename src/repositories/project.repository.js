import Project from '../models/project.model';
import NotFoundException from '../errors/not-found.error';

class ProjectRepository {
  constructor() { }

  create = async (data) => {

    const project = await Project.create( data );
    // if (!user) throw new NotFoundException('USER_NAME_NOT_FOUND');
    // const isPassValid = user.comparePassword(password);
    // if (!isPassValid) return false;
    return project;
  }

  getListByUserId = async (userId) => {
    const projects = await Project.findById({})
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