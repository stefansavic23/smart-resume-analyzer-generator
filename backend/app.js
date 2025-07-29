import "dotenv/config"
import express from "express"
import userRoutes from "./routes/userRoutes.js"
import resumeRoutes from './routes/resumeRoutes.js'
import sequelize from "./util/database.js"
import "./model/user.js"

const app = express()

app.use(express.json())

app.use("/", userRoutes)
app.use("/resume", resumeRoutes)

app.get("/welcome", (req, res) => {
    res.json("Welcome")
})

try {
    await sequelize.authenticate();
    console.log('DB connected');
    await sequelize.sync({ force: false });
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port http://localhost:${process.env.PORT}`)
    })
} catch (err) {
    console.error('Error with connecting to DB: ', err);
}



