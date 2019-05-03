import ActivityModel from '../models/activity.model'
import helper from '../utils/helper'

class ActivityRepository {
  constructor() { }
  
  create = async data => {
    const activity = await ActivityModel.create(data)
    return activity
  }

  getListByParams = async (data) => {
    const [result, count] = await helper.getListItem(ActivityModel, params)
    return [result, count]
  }

}

export default ActivityRepository