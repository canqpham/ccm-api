import IssueTypeRepository from '../repositories/issueType.repository'
import UserRepository from '../repositories/user.repository'
import {RequestResponse} from '../utils/common'

const issueTypeRepository = new IssueTypeRepository()
const userRepository = new UserRepository()

class IssueTypeController {
    create = async (req, res, next) => {
        let data = req.body
        let userId = req.userId
        try {
            //handler data
            let isExist = await issueTypeRepository.getIssueType({type: data.type})
            if(isExist) throw new Error('Issue type is exist.')

            let issueType = await issueTypeRepository.create(data)
            if (!issueType) throw new Error("Can't create type of issue.")
            return res.json(new RequestResponse({
                statusCode: 200,
                data: issueType
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
        const params = req.query
        try {
            const paramsQuery = {
                ...params,
                query: params.query || '',
                populate: params.populate || '',
                pageSize: params.pageSize || 5,
                pageNumber: params.pageNumber || 1,
              }
            let [issueTypes, count] = await issueTypeRepository.getListByParams(paramsQuery)
            if(!issueTypes) throw new Error("Can't get list issue types")
            return res.json( new RequestResponse({
                data: issueTypes,
                meta: {
                    total: count,
                  },
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
            let issueType = await issueTypeRepository.update(id, data)
            if(!issueType) throw new Error("Can't update issue type")

            return res.json(new RequestResponse({
                statusCode: 200,
                data: issueType
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
            let issueType = await issueTypeRepository.remove(id)
            if(!issueType) throw new Error("Can't remove issue type")

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

export default IssueTypeController