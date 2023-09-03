import User from "../models/userModel.js";
import bcrypt from 'bcrypt';

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json({
            succeded: true,
            user,
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }

}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        let isSame = false;

        if (user)
            isSame = await bcrypt.compare(password, user.password)
        else {
            return res.status(401).json({
                succeded: false,
                error: "There is no such a user"
            })
        }

        if (isSame)
            res.status(200).send("You are logged in")
        else
            res.status(500).json({
                succeded: false,
                error: 'Invalid password or email'
            })

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}

export { createUser, loginUser };
