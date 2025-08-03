import express from "express"
import multer from "multer"
import fs from "fs"
import pdf from "pdf-parse"
//import analyzeResume from "../controller/resumeController.js"

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

router.post("/upload", upload.single('resume'), (req, res) => {
    let dataBuffer = fs.readFileSync(req.file.path)

    pdf(dataBuffer).then(function (data) {

        // number of pages
        console.log(data.numpages);
        // number of rendered pages
        console.log(data.numrender);
        // PDF info
        console.log(data.info);
        // PDF metadata
        console.log(data.metadata);
        // PDF.js version
        // check https://mozilla.github.io/pdf.js/getting_started/
        console.log(data.version);
        // PDF text
        console.log(data.text);

    });

    res.json(req.file.path)
})

export default router