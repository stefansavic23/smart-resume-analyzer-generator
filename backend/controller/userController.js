import bcrypt from "bcrypt"

const login = (req, res) => {
    const { email } = req.body;
    const { password } = req.body;

    if (!email || !password) {
        return res.status(500).json("Email and password are required")
    }

    const saltRounds = 10

    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
           console.log(hash)
        })
    })

    res.status(200).json("Successful")

}

export default login