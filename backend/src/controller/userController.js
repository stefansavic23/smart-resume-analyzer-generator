import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../model/User.js"
import checkEmail from '../utils/checkEmail.js'
import checkPassword from '../utils/checkPassword.js'

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        checkEmail(email)
        checkPassword(password)

        const userData = { email, password }

        const user = await User.findOne({ where: { email } })

        if (!user) return res.status(404).json({ message: "User doesn't exist" })

        userData["userId"] = user.id

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result === false) {
                return res.status(401).json({ message: "Incorrect password" })
            }
            const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET)
            res.status(201).json({ accessToken: accessToken })
        })
    } catch (err) {
        res.status(401).json({ message: "Login failed ", err })
    }
}

const register = async (req, res) => {
    try {
        const { email, password } = req.body

        checkEmail(email)
        checkPassword(password)

        const hashedPassword = bcrypt.hash(password, 10)
        const userData = { email, hashedPassword }

        const user = await User.create({ email, password: (await hashedPassword).toString() })

        userData["userId"] = user.id

        const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET)

        await user.save()
        res.status(201).json({ accessToken: accessToken })
    } catch (err) {
        res.status(500).json({ message: "Registration failed ", err })
    }
}

export { login, register }