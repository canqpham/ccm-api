import Group from '../models/group.model';
import User from '../models/user.model';
import Error from '../errors/base';

// const error = new Error;

class GroupRepository {
    constructor() {}
    create = async (data) => {
        const {userId, name, level} = data;
        const user = await User.findOne({_id: userId});
        if(user.isSupperAdmin) {
            const group = await Group.create({name, level});
            return group;
        }
    }

    checkLevelExist = async (data) => {
        const {level} = data;
        const temp = await Group.findOne({level})
        if(temp) return true;
        return false;
    }

    checkNameExist = async (data) => {
        const {name} = data;
        const temp = await Group.findOne({name})
        if(temp) return true;
        return false;
    }

    getListAll = async () => {
        const groups = await Group.find()
        return groups;
    }

    update = async (id, data) => {
        await Group.findByIdAndUpdate(id, data)
        const group = await Group.findById(id)
        return group
    }
}

export default GroupRepository