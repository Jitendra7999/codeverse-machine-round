
import jwt from 'jsonwebtoken'
export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization

        if (!token) {
            return res.status(401).send({ message: "unauthorized", success: false, data: null })
        }

        jwt.verify(token, process.env.JWT_SECRETE, function (err, decode) {
            if (err) {
                return res.status(401).send({ message: err.message || "unauthorized", success: false, data: null })
            }
            req.user = decode
            next()
        })

    } catch (error) {
        res.status(500).send({ message: error.message || 'internal server error', success: false, data: null })
    }
}