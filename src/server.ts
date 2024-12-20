import express, { Application } from "express"
import { externalRoutes } from "./api/routes"
import * as dotenv from "dotenv"

dotenv.config()
const app: Application = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use("/api", externalRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
