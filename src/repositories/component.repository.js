import ComponentModel from '../models/component.model';

class ComponentRepository {
  constructor() { }

  create = async (data) => {
    const component = await ComponentModel.create(data);
    return component;
  }

  getComponent = async (data) => {
    const component = await ComponentModel.findOne(data)
    return component
  }

  update = async (id, data) => {
      await ComponentModel.findByIdAndUpdate(id, data)
      const component = await ComponentModel.findById(id)
      return component
  }

  getListComponentByParams = async (data) => {
    const components = await ComponentModel.find(data).populate('lead')
    return components
  }

  getListAll = async () => {
      const components = await ComponentModel.find()
      return components
  }

  remove = async id => {
    const component = await ComponentModel.findByIdAndRemove(id)
    return component
  }
}

export default ComponentRepository;