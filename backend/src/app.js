import express from "express"
import userRoutes from "./routes/userRoutes.js"
import resumeRoutes from './routes/resumeRoutes.js'
import sequelize from "./model/database.js"
import bodyParser from "body-parser"
import { URL, PORT } from "./constants/app.js"
import { API_PREFIX } from "./constants/api.js"
import errorHandler from "./controller/errorMiddleware.js"
import "./model/resume.js"
import "./model/User.js"
import "./associations/associations.js"
import cors from "cors"

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(`${API_PREFIX}/`, userRoutes)
app.use(`${API_PREFIX}/analyze-resume`, resumeRoutes)
app.use(errorHandler)

app.get("/welcome", (req, res) => {
    res.json("Welcome")
})

try {
    await sequelize.authenticate();
    console.log('DB connected');
    await sequelize.sync({ force: false });
    app.listen(PORT, () => {
        console.log(`Server running on port ${URL}${PORT}`)
    })
} catch (error) {
    errorHandler(error)
}
