import StoryPointRepository from '../repositories/storyPoint.repository'
import UserRepository from '../repositories/user.repository'
import {RequestResponse} from '../utils/common'

const storyPointRepository = new StoryPointRepository()
const userRepository = new UserRepository()

class LabelController {
  
    create = async (req, res, next) => {
        let data = req.body
        let userId = req.userId
        try {
            //handler data
            let isExist = await storyPointRepository.getStoryPoint({name: data.name})
            if(isExist) throw new Error('Story point is exist.')

            let label = await storyPointRepository.create(data)
            if (!label) throw new Error("Can't create label.")
            return res.json(new RequestResponse({
                statusCode: 200,
                data: label
            }))
          } catch (error) {
            return res.json( new RequestResponse({
                success: false,
                statusCode: 400,
                error
            }))
          }
    }

    getListByProjectId = async (req, res, next) => {
        try {
            const params = req.query
            const queryParams = JSON.parse(params.query)
            let storyPoint = await storyPointRepository.getListByParams(queryParams)
            if(!storyPoint) throw new Error("Can't get list story point")
            return res.json( new RequestResponse({
                data: storyPoint,
                statusCode: 200
            }))
        } catch (error) {
            return res.json( new RequestResponse({
                success: false,
                statusCode: 400,
                error
            }))
        }
    }

    getListAll = async (req, res, next) => {
        try {
            let storyPoint = await storyPointRepository.getListAll()
            if(!storyPoint) throw new Error("Can't get list story point")
            return res.json( new RequestResponse({
                data: storyPoint,
                statusCode: 200
            }))
        } catch (error) {
            return res.json( new RequestResponse({
                success: false,
                statusCode: 400,
                error
            }))
        }
    }

    remove = async (req, res, next) => {
        let id = req.params.id
        let userId = req.userId
        try {
            let storyPoint = await storyPointRepository.remove(id)
            if(!storyPoint) throw new Error("Can't remove story point")

            return res.json(new RequestResponse({
                statusCode: 200
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

export default LabelController