import "dotenv/config"
import express from "express"
import bodyParser from "body-parser"
import userRoutes from "./routes/userRoutes.js"
import resumeRoutes from './routes/resumeRoutes.js'
import path from "path"
import db from "./util/database.js"

const app = express()

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.use("/", userRoutes)
app.use("/resume", resumeRoutes)

app.get("/welcome", (req, res) => {
    res.json("Welcome")
})

db.authenticate()
    .then(
        () => {
            console.log("Database connected")
            app.listen(process.env.PORT, () => {
                console.log(`Server running on port http://localhost:${process.env.PORT}`)
            })
        }
    ).catch(err => {
        console.log("Error connecting to the database: ", err)
    })

