import "dotenv/config"

const API_KEY = process.env.GEMINI_API_KEY
const API_MODEL = process.env.GEMINI_MODEL
const API_CONTENTS = process.env.GEMINI_CONTENTS

const API_BASE_PATH = '/api'
const API_VERSION = 'v1'

const API_PREFIX = `${API_BASE_PATH}/${API_VERSION}`

export  {API_KEY, API_MODEL, API_CONTENTS, API_PREFIX}