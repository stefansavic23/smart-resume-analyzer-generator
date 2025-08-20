import 'dotenv/config'

import fs from "fs"
import pdf from "pdf-parse"
import { GoogleGenAI } from "@google/genai";
import Resume from "../model/Resume.js"

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

async function main(contents) {
    const response = await ai.models.generateContent({
        model: process.env.GEMINI_MODEL,
        contents: contents,
    });

    return response.text
}

const analyzeResume = async (req, res) => {
    const { jobDescription } = req.body

    if (!req.file) return res.status(404).json({ message: "Please input your resume" })
    if (!jobDescription) return res.status(404).json({ message: "Please enter your job description" })

    try {
        const dataBuffer = fs.readFileSync(req.file.path)
        const data = await pdf(dataBuffer)

        const analyzedResume = await main(process.env.GEMINI_CONTENTS.concat(" ", data.text, jobDescription))

        const resume = new Resume({
            filename: req.file.originalname,
            data: data.text,
            aiData: analyzedResume,
        });

        await resume.save()

        return res.status(200).json({ message: "Saved successfully" })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while analyzing the resume." });
    }
}

export default analyzeResume