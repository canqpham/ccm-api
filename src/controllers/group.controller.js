import GroupRepository from '../repositories/group.repository'
import { RequestResponse } from '../utils/common'

const groupRepository = new GroupRepository

class GroupController {
    create = async (req, res, next) => {
        let data = req.body
        try {
            let checkLevelExist = await groupRepository.checkLevelExist(data);
            let checkNameExist = await groupRepository.checkNameExist(data);

            if(checkLevelExist || checkNameExist) throw new Error('Group name or group level is exist !')

            let group = await groupRepository.create({...data, userId: req.userId});
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
        try {
            let checkLevelExist = await groupRepository.checkLevelExist(data);
            let checkNameExist = await groupRepository.checkNameExist(data);

            if(checkLevelExist || checkNameExist) throw new Error('Group name or group level is exist !')
            let group = await groupRepository.update(data);
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
}

export default GroupController;