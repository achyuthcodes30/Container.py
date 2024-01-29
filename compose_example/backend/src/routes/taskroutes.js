import {createTask,getAllTasks,getPendingTasks,getCompletedTasks,setTaskAsCompleted} from "../controllers/taskcontrollers.js"
import express from "express"

const router = express.Router()

router.route("/")
      .get(getAllTasks)
      .post(createTask)

router.route("/pending")
      .get(getPendingTasks)

router.route("/completed")
      .get(getCompletedTasks)

router.route("/setascompleted")
      .post(setTaskAsCompleted)
const taskroutes = router
export default taskroutes