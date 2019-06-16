import GroupMemberModel from '../models/groupMember.model';

class GroupMemberRepository {
    constructor() {}
    create = async (data) => {
        // const {name, level} = data;
        const group = await GroupMemberModel.create(data);
        return group;  
    }

    getGroupMember = async (data) => {
        const temp = await GroupMemberModel.findOne(data)
        if(temp) return true;
        return false;
    }

    getListByParams = async (data) => {
        const groups = await GroupMemberModel.find(data)
        return groups;
    }

    getListAll = async () => {
        const groups = await GroupMemberModel.find()
        return groups;
    }

    update = async (id, data) => {
        await GroupMemberModel.findByIdAndUpdate(id, data)
        const group = await GroupMemberModel.findById(id)
        return group
    }

    remove = async id => {
        const group = await GroupMemberModel.findByIdAndRemove(id)
        return group
    }
}

export default GroupMemberRepository