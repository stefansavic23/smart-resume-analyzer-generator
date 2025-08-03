import express from "express"
import multer from "multer"

import analyzeResume from "../controller/resumeController.js"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

const router = express.Router()

router.get("/", (req, res) => {
    return res.render("uploadResume")
})

router.post("/upload", upload.single('resume'), analyzeResume)

export default router