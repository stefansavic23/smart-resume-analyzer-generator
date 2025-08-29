import 'dotenv/config'

import fs from "fs"
import pdf from "pdf-parse"
import { GoogleGenAI } from "@google/genai";
import Resume from "../model/Resume.js"
import Analysis from '../model/Analysis.js';
import { error, log } from 'console';

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
        });

        const aiResume = new Analysis({
            filename: req.file.originalname,
            aiData: analyzedResume,
        });

        await resume.save()
        await aiResume.save()

        fs.unlink(req.file.path, (err) => {
            if (err) throw err
            console.log('deleted file successfully')
        })

        return res.status(200).json({ message: analyzedResume })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while analyzing the resume." });
    }
}

export default analyzeResume