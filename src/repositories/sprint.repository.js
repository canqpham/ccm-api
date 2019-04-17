import Sprint from '../models/sprints.model'
import mongoose from 'mongoose'

class SprintRepository {
  constructor() {}

  create = async (data) => {
    const sprint = await Sprint.create(data)
    return sprint
  }

  update = async (id, data) => {
    await Sprint.findByIdAndUpdate(id, data)
    const sprint = await Sprint.findById(id)
    return sprint
  }

  getSprint = async (data) => {
    const sprint = await Sprint.findOne(data)
    return sprint
  }

  getListAllSprint = async () => {
    const sprints = await Sprint.find()
    return sprints
  }

  getListSprintByParams = async (params) => {
    const sprints = await Sprint.find(params)
    return sprints
  }
}

export default SprintRepository