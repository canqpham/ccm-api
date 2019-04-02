import IssueTypeRepository from '../repositories/issueType.repository'
import {RequestResponse} from '../utils/common'

const issueTypeRepository = new IssueTypeRepository()

class IssueTypeController {
    create = async (req, res, next) => {
        let data = req.body
        let userId = req.userId
        try {
            //handler data
            let issueType = await issueTypeRepository.create(data)
            if (!issueType) throw new Error("Can't create type of issue")
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
        try {
            let issueTypes = await issueTypeRepository.getListAll()
            if(!issueTypes) throw new Error("Can't get list issue types")
            return res.json( new RequestResponse({
                data: issueTypes,
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
}

export default IssueTypeController