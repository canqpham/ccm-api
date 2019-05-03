import SprintRepository from "../repositories/sprint.repository";
import IssueRepository from "../repositories/issue.repository";
import WorkflowRepository from "../repositories/workflow.repository";
import moment from "moment";

import { RequestResponse } from "../utils/common";

const sprintRepository = new SprintRepository();
const workflowRepository = new WorkflowRepository();
const issueRepository = new IssueRepository();

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
    // console.log(req)
    let id = req.params.id;
    let userId = req.userId;
    try {
      let sprint = await sprintRepository.getSprintById(id);
      if (!sprint) throw new Error("Can't get sprint");

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

  getListSprintNotComplete = async (req, res, next) => {
    let params = req.query;
    let userId = req.userId;
    try {
      const queryParams = JSON.parse(params.query)
      // console.log(queryParams)
      
      let sprints = await sprintRepository.getListSprintByParams(queryParams);
      // console.log(sprints)
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

  addIssueToSprint = async (req, res, next) => {
    const { issue, sprint } = req.body;
    try {
      const is = await issueRepository.update(issue, { sprint });
      console.log(is);
      const result = await sprintRepository.getSprintById(sprint);
      if (!result) throw new Error("Cannot add issue to this sprint");

      return res.json(
        new RequestResponse({
          statusCode: 200,
          data: result
        })
      );
    } catch (error) {
      return res.json(
        new RequestResponse({
          statusCode: 400,
          succes: false,
          error
        })
      );
    }
  };

  startSprint = async (req, res, next) => {
    const { project, active } = req.body;
    // const data = req.body
    const sprintId = req.body.sprint;
    const userId = req.userId;
    try {
      const sprints = await sprintRepository.getListSprintByParams({ project });
      if (!sprints) throw new Error("Not found sprints of this project");
      const isExist = await sprints.find(item => item.active == true);
      if (isExist) throw new Error("Have been sprints started");

      const issues = await issueRepository.getListIssueByParams({
        project,
        sprint: sprintId
      });
      const workflowTodo = await workflowRepository.getWorkflow({
        name: 'TO DO'
      });
      
      if(!workflowTodo) throw new Error("Can't add all issues to 'TO DO' board")
      issues.map(async issue => {
        await issueRepository.update(issue._id, { workflow: workflowTodo._id });
      });
      const sprint = await sprintRepository.update(sprintId, { active });
      if (!sprint) throw new Error("Can't start sprint");

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

  completeSprint = async (req, res, next) => {
    const { project } = req.body;
    const data = req.body;
    const sprintId = req.body.sprint;
    const userId = req.userId;
    try {
      const sprints = await sprintRepository.getListSprintByParams({ project });
      if (!sprints) throw new Error("Not found sprints of this project");

      const sprint = await sprintRepository.update(sprintId, data);
      if (!sprint) throw new Error("Can't start sprint");

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

  getSprintActive = async (req, res, next) => {
    try {
      const params = req.query
      const query = JSON.parse(params.query)
      const sprint = await sprintRepository.getSprintActiveInProject(query)
      if(!sprint) throw new Error("Cannot get sprint is actived.")
      return res.json( new RequestResponse({
        data: sprint,
        statusCode: 200,
      }))
    } catch (error) {
      new RequestResponse({
        statusCode: 400,
        success: false,
        error
      })
    }
  }
}

export default SprintController;
