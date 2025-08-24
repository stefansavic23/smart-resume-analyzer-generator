import express from "express"
import multer from "multer"

import analyzeResume from "../controller/resumeController.js"
import authenticateToken from "../controller/authMiddleware.js"

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

router.post("/", upload.single('resume'), authenticateToken, analyzeResume)

export default router