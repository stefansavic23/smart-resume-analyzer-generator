import 'dotenv/config'

import fs from "fs"
import pdf from "pdf-parse"
import { GoogleGenAI } from "@google/genai";
import Resume from "../model/Resume.js"
import { log } from 'console';

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

async function main(contents) {
    const response = await ai.models.generateContent({
        model: process.env.GEMINI_MODEL,
        contents: contents,
    });
    console.log(response.text);
}

const analyzeResume = async (req, res) => {
    if (!req.file) return res.status(404).json({ message: "Please input your resume" })

    let dataBuffer = fs.readFileSync(req.file.path)

    pdf(dataBuffer).then(function (data) {
        const resume = new Resume({ filename: req.file.originalname, data: data.text })
        resume.save()
        main(process.env.GEMINI_CONTENTS.concat(" ", data.text));
        return res.status(200).json({ message: "Saved successfully" })
    });
}

export default analyzeResume