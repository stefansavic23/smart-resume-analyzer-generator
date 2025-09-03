import validator from "validator"

const checkEmail = (email) => {
    if (validator.isEmail(email) === false) {
        return res.status(400).json({ message: "Incorrect email" })
    }
}

export default checkEmail