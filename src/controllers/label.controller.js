import LabelRepository from '../repositories/label.repository'
import UserRepository from '../repositories/user.repository'
import {RequestResponse} from '../utils/common'

const labelRepository = new LabelRepository()
const userRepository = new UserRepository()

class LabelController {
  
    create = async (req, res, next) => {
        let data = req.body
        let userId = req.userId
        try {
            //handler data
            let isExist = await labelRepository.getLabel({name: data.name})
            if(isExist) throw new Error('Label is exist.')

            let label = await labelRepository.create(data)
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
            let labels = await labelRepository.getListByParams(queryParams)
            if(!labels) throw new Error("Can't get list labels")
            return res.json( new RequestResponse({
                data: labels,
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
            let labels = await labelRepository.getListAll()
            if(!labels) throw new Error("Can't get list labels")
            return res.json( new RequestResponse({
                data: labels,
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

    update = async (req, res, next) => {
        let data = req.body
        let userId = req.userId
        let id = req.params.id
        try {
            let label = await labelRepository.update(id, data)
            if(!label) throw new Error("Can't update label")

            return res.json(new RequestResponse({
                statusCode: 200,
                data: label
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
        let id = req.params.id
        let userId = req.userId
        try {
            let label = await labelRepository.remove(id)
            if(!label) throw new Error("Can't remove label")

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