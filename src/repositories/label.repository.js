import Label from '../models/label.model';

class LabelRepository {
  constructor() { }

  create = async (data) => {
    const label = await Label.create(data);
    return label;
  }

  getLabel = async (data) => {
    const label = await Label.findOne(data)
    return label
  }

  update = async (id, data) => {
      await label.findByIdAndUpdate(id, data)
      const label = await Label.findById(id)
      return label
  }

  getListByParams = async (data) => {
    const labels = await Label.find(data)
      return labels
  }

  getListAll = async () => {
      const labels = await Label.find()
      return labels
  }

  remove = async (id) => {
    const label = await Label.findByIdAndRemove(id)
    return label
  }
}

export default LabelRepository;