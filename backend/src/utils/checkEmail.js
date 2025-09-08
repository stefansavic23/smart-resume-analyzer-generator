import validator from "validator"

const checkEmail = (email) => {
    return validator.isEmail(email)
}

export default checkEmail