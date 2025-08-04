import 'dotenv/config'

import fs from "fs"
import pdf from "pdf-parse"
import { GoogleGenAI } from "@google/genai";
import Resume from "../model/Resume.js"

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

async function main() {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Explain how AI works in a few words",
    });
    console.log(response.text);
}

const analyzeResume = async (req, res) => {
    if (!req.file) return res.status(404).json({ message: "Please input your resume" })

    let dataBuffer = fs.readFileSync(req.file.path)

    pdf(dataBuffer).then(function (data) {
        const resume = new Resume({ filename: req.file.originalname, data: data.text })
        resume.save()
        return res.status(200).json({ message: "Saved successfully" })
    });

    main();
}

export default analyzeResume