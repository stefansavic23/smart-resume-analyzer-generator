import express from "express"
import login from "../controller/userController.js"

const router = express.Router()

router.post("/login", login)

router.get("/register", (req, res) => {
    res.json("register")
})

export default router