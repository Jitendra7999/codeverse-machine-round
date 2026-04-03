import express from 'express'
import { publicUserLogin, publicUserProfile, publicUserSignup } from '../controllers/authController.js'
import { verifyToken } from '../middleware/tokenVerify.js'

const router = express.Router()

router.post('/signup',publicUserSignup)
router.post('/login',publicUserLogin)
router.get('/profile/:id',verifyToken,publicUserProfile)


export default router