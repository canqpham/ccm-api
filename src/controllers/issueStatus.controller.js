import IssueStatusRepository from '../repositories/issueStatus.repository'
import UserRepository from '../repositories/user.repository'
import {RequestResponse} from '../utils/common'

const issueStatusRepository = new IssueStatusRepository()
const userRepository = new UserRepository()

class IssueStatusController {
    create = async (req, res, next) => {
        let data = req.body
        let userId = req.userId
        try {
            //handler data
            let isExist = await issueStatusRepository.getIssueStatus({status: data.status})
            if(isExist) throw new Error('Issue status is exist.')

            let issueStatus = await issueStatusRepository.create(data)
            if (!issueStatus) throw new Error("Can't create status of issue.")

            return res.json(new RequestResponse({
                statusCode: 200,
                data: issueStatus
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
            let issueStatuss = await issueStatusRepository.getListAll()
            if(!issueStatuss) throw new Error("Can't get list issue statuses")
            return res.json( new RequestResponse({
                data: issueStatuss,
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
            let issueStatus = await issueStatusRepository.update(id, data)
            if(!issueStatus) throw new Error("Can't update issue status")

            return res.json(new RequestResponse({
                statusCode: 200,
                data: issueStatus
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
            let issueStatus = await issueStatusRepository.remove(id)
            if(!issueStatus) throw new Error("Can't remove issue status")

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

export default IssueStatusController