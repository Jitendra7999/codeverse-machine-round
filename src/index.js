import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './config/db.js'
import publicAuthRoute from './routes/authRoutes.js'
import superAdminRoute from './routes/superAdminAuthRoute.js'
import masterRoute from './routes/masterRoute.js'
dotenv.config()

const app = express()
connectDb()


app.use(express.json())
app.use(cors())

app.use('/auth',publicAuthRoute)
app.use('/superadmin',superAdminRoute)
app.use('/master',masterRoute)

const port = process.env.PORT || 3001

app.listen(port,()=>console.log(`Sever is running on port ${port}`))