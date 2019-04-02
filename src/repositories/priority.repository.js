import Priority from '../models/priority.model';
import NotFoundException from '../errors/not-found.error';

class PriorityRepository {
  constructor() { }

  create = async (data) => {
    const {name, level} = data;
    let temp = await Priority.findOne({name})
    if(temp) return null;
    temp = await Priority.findOne({level})
    if(temp) return null;
    const priority = await Priority.create(data);
    return priority;
  }

  update = async (id, data) => {
      const priority = await Priority.findByIdAndUpdate(id, data)
      return priority
  }

  getListAll = async () => {
      const priorities = await Priority.find()
      return priorities
  }
}

export default PriorityRepository;