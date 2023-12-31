import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
const checkUser = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (token) {
            jwt.verify(token, process.env.SECRET_TOKEN, async (err, decoded) => {
                if (err) {
                    res.locals.user = null
                    next()
                } else {
                    const user = await User.findById(decoded.userId)
                    res.locals.user = user
                    next()
                }
            })
        } else {
            res.locals.user = null
            next()
        }
    } catch (error) {

    }
}
const authenticateToken = async (req, res, next) => {
    try {
        const token = req.cookies.jwt

        if (token) {
            jwt.verify(token, process.env.SECRET_TOKEN, (err) => {
                if (err) {
                    res.redirect("/login")
                } else {
                    next()
                }
            })
        } else {
            res.redirect("/login")
        }
    } catch (error) {
        console.log(error)
    }

}

export { authenticateToken, checkUser };
