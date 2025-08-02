import fs from "fs"
import multer from "multer"
import pdf from "pdf-parse"

const analyzeResume = (req, res) => {

    let dataBuffer = fs.readFileSync(`../uploads/${req.file}`)

    pdf(dataBuffer).then(function (data) {
        console.log(data.text)
        return res.render("analyzedResume", { resume: resume })
    })
}

export default analyzeResume