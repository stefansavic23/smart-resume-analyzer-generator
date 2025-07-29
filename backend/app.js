import "dotenv/config"
import express from "express"
import userRoutes from "./routes/userRoutes.js"
import resumeRoutes from './routes/resumeRoutes.js'
import User from "./model/user.js"
import sequelize from "./util/database.js"

const app = express()

app.use(express.json())

app.use("/", userRoutes)
app.use("/resume", resumeRoutes)

app.get("/welcome", (req, res) => {
    res.json("Welcome")
})

try{
    await sequelize.sync({ force: false }); 
    console.log("Database synced")
} catch(error) {
    console.error("Error with syncing: ", error)
}

app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT}`)
})

