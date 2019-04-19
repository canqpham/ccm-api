import CommentRepository from '../repositories/comment.repository'
import {RequestResponse} from '../utils/common'

const commentRepository = new CommentRepository()

class CommentController {

  create = async (req, res, next) => {
    let data = req.body
    const userId = req.userId
    try {
      data = {
        ...data,
        creator: userId
      }
      const comment = await commentRepository.create(data)
      if(!comment) throw new Error("Cannot comment in this issue")
      return res.json(new RequestResponse({
        statusCode: 200,
        data: comment
      }))
    } catch (error) {
      return res.json(new RequestResponse({
        statusCode: 400,
        success: false,
        error
      }))
    }
  }

  update = async (req, res, next) => {
    const data = req.body
    const commentId = req.params.id
    try {
      const comment = await commentRepository.update(commentId, data)
      if(!comment) throw new Error("Cannot update this comment")
      return res.json(new RequestResponse({
        statusCode: 200,
        data: comment
      }))
    } catch (error) {
      return res.json(new RequestResponse({
        statusCode: 400,
        success: false,
        error
      }))
    }
  }

  remove = async (req, res, next) => {
    // const data = req.body
    const commentId = req.params.id
    try {
      const comment = await commentRepository.remove(commentId)
      if(!comment) throw new Error("Cannot remove this comment")
      return res.json(new RequestResponse({
        statusCode: 200,
        data: comment
      }))
    } catch (error) {
      return res.json(new RequestResponse({
        statusCode: 400,
        success: false,
        error
      }))
    }
  }
  
}

export default CommentController