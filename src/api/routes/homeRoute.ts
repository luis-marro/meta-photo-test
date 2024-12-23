import { Router } from "express"
import { HomeController } from "../controllers"

const homeRoute = Router()

homeRoute.get("/", HomeController.homepage)

export { homeRoute }
