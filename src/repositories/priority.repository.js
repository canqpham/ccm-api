import Priority from '../models/priority.model';
import NotFoundException from '../errors/not-found.error';

class PriorityRepository {
  constructor() { }

  create = async (data) => {
    const priority = await Priority.create(data);
    return priority;
  }

  getPriority = async (data) => {
    const priority = await Priority.findOne(data)
    return priority
  }


  update = async (id, data) => {
      await Priority.findByIdAndUpdate(id, data)
      const priority = await Priority.findById(id)
      return priority
  }

  getListAll = async () => {
      const priorities = await Priority.find()
      return priorities
  }

  remove = async (id) => {
    const priority = await Priority.findByIdAndRemove(id)
    return priority
  }
}

export default PriorityRepository;