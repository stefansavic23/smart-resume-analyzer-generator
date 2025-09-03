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


    const result = passwordSchema.validate(password, { details: true })

    if (result.length > 0) {
        const messages = result.map(r => r.message)
        return res.status(400).json(messages)
    }
}

export default checkPassword