import "dotenv/config"
import express from "express"

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.json("radi")
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT}`)
})