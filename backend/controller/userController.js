import 'dotenv/config'

import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../model/User.js"
import validator from "validator"
import passwordValidator from "password-validator"

const isValidEmail = (email) => {
    if (validator.isEmail(email) === false) {
        return res.status(400).json({ message: "Incorrect email" })
    }
}

const isValidPassword = (password) => {
    const passwordSchema = new passwordValidator()

    passwordSchema
        .is().min(8)
        .is().max(64)
        .has().uppercase()
        .has().lowercase()
        .has().digits(2)
        .has().not().spaces()


    const result = passwordSchema.validate(password, { details: true })

    if (result.length > 0) {
        const messages = result.map(r => r.message)
        return res.status(400).json(messages)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        isValidEmail(email)
        isValidPassword(password)

        const userData = { email, password }
        const user = await User.findOne({ where: { email } })

        if (!user) return res.status(404).json({ message: "User doesn't exist" })

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

        isValidEmail(email)
        isValidPassword(password)

        const hashedPassword = bcrypt.hash(password, 10)
        const userData = { email, hashedPassword }

        const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.create({ email, password: (await hashedPassword).toString() })

        await user.save()
        res.status(201).json({ accessToken: accessToken })
    } catch (err) {
        res.status(500).json({ message: "Registration failed ", err })
    }
}

export { login, register }