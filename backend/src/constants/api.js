import "dotenv/config"

const apiKey = process.env.GEMINI_API_KEY
const apiModel = process.env.GEMINI_MODEL
const apiContents = process.env.GEMINI_CONTENTS

export  {apiKey, apiModel, apiContents}