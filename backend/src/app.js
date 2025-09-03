import "dotenv/config"
import express from "express"
import userRoutes from "./routes/userRoutes.js"
import resumeRoutes from './routes/resumeRoutes.js'
import sequelize from "./model/database.js"
import bodyParser from "body-parser"
import {PORT} from "./constants/app.js"
import "./model/resume.js"
import "./model/User.js"
import "./associations/associations.js"
import cors from "cors"

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use("/", userRoutes)
app.use("/analyze-resume", resumeRoutes)

app.get("/welcome", (req, res) => {
    res.json("Welcome")
})

try {
    await sequelize.authenticate();
    console.log('DB connected');
    await sequelize.sync({ force: false });
    app.listen(PORT, () => {
        console.log(`Server running on port http://localhost:${PORT}`)
    })
} catch (err) {
    console.error('Error with connecting to DB: ', err);
}
