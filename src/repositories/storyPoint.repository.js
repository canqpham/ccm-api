import StoryPointModel from '../models/storyPoint.model';

class LabelRepository {
  constructor() { }

  create = async (data) => {
    const point = await StoryPointModel.create(data);
    return point;
  }

  getStoryPoint = async (data) => {
    const point = await StoryPointModel.findOne(data)
    return point
  }

  update = async (id, data) => {
      await StoryPointModel.findByIdAndUpdate(id, data)
      const point = await StoryPointModel.findById(id)
      return point
  }

  getListByParams = async (data) => {
    const points = await StoryPointModel.find(data)
      return points
  }

  getListAll = async () => {
      const points = await StoryPointModel.find()
      return points
  }

  remove = async (id) => {
    const points = await StoryPointModel.findByIdAndRemove(id)
    return points
  }
}

export default LabelRepository;