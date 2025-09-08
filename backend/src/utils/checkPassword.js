import passwordValidator from "password-validator"

const checkPassword = (password) => {
    const passwordSchema = new passwordValidator()

    passwordSchema
        .is().min(8)
        .is().max(64)
        .has().uppercase()
        .has().lowercase()
        .has().digits(2)
        .has().not().spaces()


    const result = passwordSchema.validate(password)

    return result
}

export default checkPassword