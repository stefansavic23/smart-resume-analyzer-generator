import {ACCESS_TOKEN_SECRET} from "../constants/tokens.js"
import jwt from "jsonwebtoken"

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.status(401).json({ error: "Access denied" })

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

export default authenticateToken