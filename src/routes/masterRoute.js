import express from 'express'
import { verifyToken } from '../middleware/tokenVerify.js'
// import { adminLogin, createMaster, masters } from '../controllers/adminController.js'

const router = express.Router()

// router.post('/login',adminLogin)
// router.post('/user',verifyToken,createMaster)
// router.get('/users',verifyToken,masters)


export default router