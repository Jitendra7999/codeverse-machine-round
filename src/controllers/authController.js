import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { publicUserDb } from '../utils/databases.js'

export const publicUserSignup = async (req, res) => {
    try {
        const { name = '', email = '', password = '' } = req.body

        if (!name) {
            return res.status(400).send({ message: 'Please enter you name its required', success: false, data: null })
        }
        if (!email) {
            return res.status(400).send({ message: 'Please enter you name its required', success: false, data: null })
        }
        if (!password) {
            return res.status(400).send({ message: 'Please enter you password its required', success: false, data: null })
        }

        const userModel = await publicUserDb()

        const userExist = await userModel.findOne({ email })

        if (userExist) {
            return res.status(400).send({ message: 'User all ready exist with this email', success: false, data: null })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const userCreated = await userModel.create({ name, email, password: hashPassword })

        res.status(201).send({ message: 'User sign up successfully', success: true, data: userCreated })


    } catch (error) {
        res.status(500).send({ message: error.message || 'internal server error', success: false, data: null })
    }
}


export const publicUserLogin = async (req, res) => {
    try {
        const { email = '', password = '' } = req.body

        if (!email) {
            return res.status(400).send({ message: 'Please enter you name its required', success: false, data: null })
        }
        if (!password) {
            return res.status(400).send({ message: 'Please enter you password its required', success: false, data: null })
        }
        const userModel = await publicUserDb()
        const userExist = await userModel.findOne({ email })

        if (!userExist) {
            return res.status(404).send({ message: 'User not exist with this email', success: false, data: null })
        }

        const comparePassword = await bcrypt.compare(password, userExist.password)

        if (!comparePassword) {
            return res.status(400).send({ message: 'Wrong password', success: false, data: null })

        }

        const payload = {
            _id: userExist._id,
            name: userExist.name,
            email: userExist.email
        }

        const token = jwt.sign(payload, process.env.JWT_SECRETE, { expiresIn: '1d' })

        res.status(201).send({
            message: 'User login successfully', success: true, data: {
                token,
                userId: userExist._id
            }
        })


    } catch (error) {
        res.status(500).send({ message: error.message || 'internal server error', success: false, data: null })
    }
}

export const publicUserProfile = async (req, res) => {
    try {
        const id = req.params.id || ''

        if (!id) {
            return res.status(400).send({
                message: 'User id is required', success: false, data: null
            })
        }
        const userModel = await publicUserDb()
        const user = await userModel.findById(id)

        if (!user) {
            return res.status(404).send({
                message: 'User not found', success: false, data: null
            })
        }
        return res.status(200).send({
            message: 'User fetch', success: true, data: user
        })
    } catch (error) {
        res.status(500).send({ message: error.message || 'internal server error', success: false, data: null })
    }
}