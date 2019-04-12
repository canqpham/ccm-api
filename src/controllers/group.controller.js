import GroupRepository from '../repositories/group.repository'
import UserRepository from '../repositories/user.repository'
import { RequestResponse } from '../utils/common'

const groupRepository = new GroupRepository()
const userRepository = new UserRepository()

class GroupController {
    create = async (req, res, next) => {
        let data = req.body
        const userId = req.userId
        try {
            // check data request
            if(!data.name || !data.level) throw new Error('Missing level property or name property.')

            // check data is exist
            let isLevelExist = await groupRepository.getGroup({level: data.level});
            let isNameExist = await groupRepository.getGroup({name: data.name});
            if(isLevelExist || isNameExist) throw new Error('Group name or group level is exist.')

            // check role
            let user = await userRepository.getUserInfo(userId)
            if(!user.isSuperAdmin) throw new Error('Group must be created by superAdmin role.')

            // create new group
            let group = await groupRepository.create({...data, userId});

            // error: can't create
            if (!group) throw new Error("Can't create group");
      
            return res.json( new RequestResponse({
                data: group,
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

    getListAll  = async (req, res, next) => {
        try {
            let groups = await groupRepository.getListAll();
            if(!groups) throw new Error("Can't get list group")
            return res.json( new RequestResponse({
                data: groups,
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

    update = async (req, res, next) => {
        const data = req.body
        const id = req.params.id
        try {
           // check data is exist
           let isLevelExist = await groupRepository.getGroup({level: data.level});
           let isNameExist = await groupRepository.getGroup({name: data.name});
           if(isLevelExist || isNameExist) throw new Error('Group name or group level is exist.')

            let group = await groupRepository.update(id, data);
            if(!group) throw new Error("Can't update group")
            return res.json( new RequestResponse({
                data: group,
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

    // getGroupByParams = async
}

export default GroupController;