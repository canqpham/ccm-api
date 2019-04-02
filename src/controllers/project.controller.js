import ProjectRepository from "../repositories/project.repository";

const projectRepository = new ProjectRepository();

class ProjectController {
  create = async (req, res, next) => {
    let data = req.body;
    // console.log(req.userId)
    try {
      //handler login
      let project = await projectRepository.create(creator = req.userId, data);
      if (!project) throw new Error("Can't create project");
      
      //Initialize token
      // let token = await this._signToken(user);
      return res.json({ project });
    } catch (error) {
      console.log("error.status: ", error.status);
      return res.status(error.status || 500).json({
        message: error.message
      });
    }
  };

  getListByUserId = async (req, res, next) => {
    let userId = req;
    try {
      //handler
      let projects = await projectRepository.getListByUserId({
        user: userId
      });
      if (!projects) throw new Error("Can't get projects");

      //Initialize token
      return res.json({ projects });
    } catch (error) {
      console.log("error.status: ", error.status);
      return res.status(error.status || 500).json({
        message: error.message
      });
    }
  }
}

export default ProjectController;
