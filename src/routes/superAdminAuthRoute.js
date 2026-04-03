import express from 'express'
import { verifyToken } from '../middleware/tokenVerify.js'
import { adminLogin, createMaster, adminMasters } from '../controllers/adminController.js'

const router = express.Router()

router.post('/login',adminLogin)
router.post('/master',verifyToken,createMaster)
router.get('/masters',verifyToken,adminMasters)


export default router