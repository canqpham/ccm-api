import Group from '../models/group.model';

class GroupRepository {
    constructor() {}
    create = async (data) => {
        const {name, level} = data;
        const group = await Group.create({name, level});
        return group;  
    }

    getGroup = async (data) => {
        const temp = await Group.findOne(data)
        if(temp) return true;
        return false;
    }

    getListByParams = async (data) => {
        const groups = await Group.find(data)
        return groups;
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

    remove = async id => {
        const group = await Group.findByIdAndRemove(id)
        return group
    }
}

export default GroupRepository