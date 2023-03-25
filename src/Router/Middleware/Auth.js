// import { verifyToken } from '../../Utils/jwt.js'
import CustomError from '../../Utils/ResponseHandler/CustomError.js'
import jwt from 'jsonwebtoken'
export const AuthMiddleware = async (req, res, next) => {
    const AuthHeader =
        req.headers.authorization ||
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token']
    if (!AuthHeader) {
        return next(CustomError.unauthorized())
    }
    const parts = AuthHeader.split(' ')
    try {
        if (parts.length !== 2) {
            console.log(parts)
            return next(CustomError.unauthorized())
        }

        const [scheme, token] = parts

        if (!/^Bearer$/i.test(scheme)) {
            return next(CustomError.unauthorized())
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return next(CustomError.createError('Token Expired', 401))
                } else {
                    return next(CustomError.createError('Inviald Token', 401))
                }
            }
            // Find User
            // const IsUser = await Parent.findOne({ _id: decoded.payload._id })
            // if (!IsUser) {
            // return next(CustomError.createError('User Not Found', 404))
            // }
            // req.user = IsUser
            req.token = token
            return next()
        })
    } catch (error) {
        return next(CustomError.unauthorized())
    }
}
