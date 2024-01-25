import express from "express"
import volunteerController from "../controllers/volunteerController"
const router =express.Router()

router.post("/form",volunteerController)



export default router