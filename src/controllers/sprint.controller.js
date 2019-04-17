import SprintRepository from "../repositories/sprint.repository";
import moment from 'moment';

import { RequestResponse } from "../utils/common";

const sprintRepository = new SprintRepository();

class SprintController {
  constructor() {}

  create = async (req, res, next) => {
    let data = req.body;
    let userId = req.userId;
    try {
      const sprint = await sprintRepository.create(data);
      if (!sprint) throw new Error("Can't create sprint");
      return res.json(
        new RequestResponse({
          statusCode: 200,
          data: sprint
        })
      );
    } catch (error) {
      return res.json(
        new RequestResponse({
          success: false,
          statusCode: 400,
          error
        })
      );
    }
  };

  getListAll = async (req, res, next) => {
    let userId = req.userId;
    try {
      const sprints = await sprintRepository.getListAll();
      if (!sprints) throw new Error("Can't get list sprints");
      return res.json(
        new RequestResponse({
          statusCode: 200,
          data: sprints
        })
      );
    } catch (error) {
      return res.json(
        new RequestResponse({
          success: false,
          statusCode: 400,
          error
        })
      );
    }
  };

  update = async (req, res, next) => {
    let data = req.body;
    let userId = req.userId;
    let id = req.params.id;
    try {
      let sprint = await sprintRepository.update(id, data);
      if (!sprint) throw new Error("Can't update project type");

      return res.json(
        new RequestResponse({
          statusCode: 200,
          data: sprint
        })
      );
    } catch (error) {
      return res.json(
        new RequestResponse({
          statusCode: 400,
          success: false,
          error
        })
      );
    }
  };

  remove = async (req, res, next) => {
    let id = req.params.id;
    let userId = req.userId;
    try {
      let sprint = await sprintRepository.remove(id);
      if (!sprint) throw new Error("Can't remove sprint");

      return res.json(
        new RequestResponse({
          data: sprint,
          statusCode: 200
        })
      );
    } catch (error) {
      return res.json(
        new RequestResponse({
          statusCode: 400,
          success: false,
          error
        })
      );
    }
  };

  getSprint = async (req, res, next) => {
    let id = req.params.id;
    let userId = req.userId;
    try {
      let sprint = await sprintRepository.getSprint({ _id: id });
      if (!sprint) throw new Error("Can't remove sprint");

      return res.json(
        new RequestResponse({
          data: sprint,
          statusCode: 200
        })
      );
    } catch (error) {
      return res.json(
        new RequestResponse({
          statusCode: 400,
          success: false,
          error
        })
      );
    }
  };

  getListSprintByParams = async (req, res, next) => {
    let { completed } = req.params;
    let userId = req.userId;
    try {
      let sprints = await sprintRepository.getListSprintByParams({ completed });
      if (!sprints) throw new Error("Can't get list sprints");

      return res.json(
        new RequestResponse({
          data: sprints,
          statusCode: 200
        })
      );
    } catch (error) {
      return res.json(
        new RequestResponse({
          statusCode: 400,
          success: false,
          error
        })
      );
    }
  };

  startSprint = async (req, res, next) => {
    const data, {project, sprint} = req.body
    const userId = req.userId
    try {
      const sprints = await sprintRepository.getListSprintByParams({project})
      if(!sprints) throw new Error('Not found sprints of this project')
      const isExist = await sprints.toObject().find(item => item.active == true)
      if(isExist) throw new Error('Have been sprints started')
      // const query = {
      //   ...req.body,
      // }

      const sprint = await sprintRepository.update(sprint, data)
      if(!sprint) throw new Error("Can't start sprint")

      return res.json(new RequestResponse({
        statusCode: 200,
        data: sprint
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

export default SprintController;
