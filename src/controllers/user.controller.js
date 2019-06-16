import UserRepository from '../repositories/user.repository';
import ProjectMemberRepository from '../repositories/projectMember.repository'
import { RequestResponse } from '../utils/common';

const userRepository = new UserRepository();
const projectMemberRepository = new ProjectMemberRepository();
class UserController {
    register = async (req, res, next) => {
        let data = req.body;
        try {
            //handler login
            let user = await userRepository.handlerRegister(data);
            if (!user) throw new Error("Email is exist");
      
            //Initialize token
            // let token = await this._signToken(user);
            return res.json(new RequestResponse({
              data: user,
              statusCode: 200
            }));
          } catch (error) {
            return res.json(new RequestResponse({
              error,
              statusCode: 400,
              success: false
            }));
          }
    }

    getListEmail = async (req, res, next) => {
      let id = req.userId
      const { query, email } = req.query
      try {
        const project = JSON.parse(query).project
        // const email = JSON.parse(query).email
        // console.log(JSON.parse(query))
        let users = await userRepository.getListEmail(email)
        if(!users) throw new Error("Email not found !")
        return res.json( new RequestResponse({
          data: users,
          statusCode: 200
        }))
      } catch (error) {
        return res.json( new RequestResponse({
          success: false,
          statusCode: 400,
          error
        }))
      }

    }

    getInfo = async (req, res, next) => {
      let _id = req.userId;
      try {
        let user = await userRepository.getUserInfo(_id)
        if(!user) throw new Error("User not found !")
        return res.json( new RequestResponse({
          data: user,
          statusCode: 200
        }))
      } catch (error) {
        return res.json( new RequestResponse({
          success: false,
          statusCode: 400,
          error
        }))
      }
    }

    getListUserByProject = async (req, res, next) => {
      let id = req.userId
      const { query } = req.query
      try {
        const project = JSON.parse(query).project
        let users = await projectMemberRepository.getListUserByProjectId(project)
        if(!users) throw new Error("User not found !")
        return res.json( new RequestResponse({
          data: users,
          statusCode: 200
        }))
      } catch (error) {
        return res.json( new RequestResponse({
          success: false,
          statusCode: 400,
          error
        }))
      }
    }
}

export default UserController;