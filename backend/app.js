import "dotenv/config"
import express from "express"
import bodyParser from "body-parser"
import userRoutes from "./routes/userRoutes.js"

const app = express()

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.use("/", userRoutes)

app.get("/welcome", (req, res) => {
    res.json("Welcome")
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT}`)
})