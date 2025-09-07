import fs from "fs"
import pdf from "pdf-parse"
import { GoogleGenAI } from "@google/genai";
import Resume from "../model/resume.js"
import Analysis from '../model/Analysis.js';
import { API_KEY, API_MODEL, API_CONTENTS } from "../constants/api.js"
import errorHandler from "../controller/errorHandler.js"

const ai = new GoogleGenAI({ apiKey: API_KEY });

async function main(contents) {
    const response = await ai.models.generateContent({
        model: API_MODEL,
        contents: contents,
    });

    return response.text
}

const analyzeResume = async (req, res) => {
    try {
        const { jobDescription } = req.body

        if (!req.file) return res.status(404).json({ message: "Please input your resume" })
        if (!jobDescription) return res.status(404).json({ message: "Please enter your job description" })

        let dataBuffer = fs.readFileSync(req.file.path)
        const data = await pdf(dataBuffer)

        const analyzedResume = await main(API_CONTENTS.concat(" ", data.text, jobDescription))

        const resume = new Resume({
            filename: req.file.originalname,
            data: data.text,
            userID: req.user.userId
        });

        const aiResume = new Analysis({
            filename: req.file.originalname,
            aiData: analyzedResume,
            resumeID: req.user.userId
        });

        await resume.save()
        await aiResume.save()

        fs.unlink(req.file.path, (err) => {
            if (err) throw err
            console.log('deleted file successfully')
        })

        return res.status(200).json({ message: analyzedResume })
    } catch (error) {
        errorHandler(error)
    }
}

export default analyzeResume