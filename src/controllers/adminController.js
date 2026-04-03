import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { adminMasterModel, adminUserModel, publicUserDb } from '../utils/databases.js'

export const createMaster = async (req, res) => {
    try {
        const { name = '' } = req.body

        if (!name) {
            return res.status(400).send({ message: 'Please enter master name its required', success: false, data: null })
        }

        const masterModel = await adminMasterModel()

        const masterExist = await masterModel.findOne({ name })

        if (masterExist) {
            return res.status(400).send({ message: 'Master all ready exist with this name', success: false, data: null })
        }

        const masterCreated = await masterModel.create({ name })

        res.status(201).send({ message: 'Master created', success: true, data: masterCreated })


    } catch (error) {
        res.status(500).send({ message: error.message || 'internal server error', success: false, data: null })
    }
}


export const adminLogin = async (req, res) => {
    try {
        const { email = '', password = '' } = req.body

        if (!email) {
            return res.status(400).send({ message: 'Please enter you name its required', success: false, data: null })
        }
        if (!password) {
            return res.status(400).send({ message: 'Please enter you password its required', success: false, data: null })
        }
        const adminUserModel = await adminUserModel()
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

export const adminMasters = async (req, res) => {
    try {
        const masterModel = await adminMasterModel()
        const masters = await masterModel.find()// add pagination also but due to time
        res.status(200).send({ message: "data", success: true, data: masters })

    } catch (error) {
        res.status(500).send({ message: error.message || 'internal server error', success: false, data: null })
    }
}

