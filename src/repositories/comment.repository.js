import CommentModel from '../models/comment.model'

class CommentRepository {
  constructor() { }
  
  create = async data => {
    const comment = await CommentModel.create(data)
    return comment
  }

  update = async (id, data) => {
    await CommentModel.findByIdAndUpdate(id, data)
    const comment = await CommentModel.findById(id)
    return comment
  }

  remove = async (id) => {
    const comment = await CommentModel.findByIdAndRemove(id)
    return comment
  }
}

export  default CommentRepository