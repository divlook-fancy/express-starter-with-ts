import express from 'express'
import apiRouter from '@/routes/api'
import webRouter from '@/routes/web'

const router = express.Router()

router.use('/api', apiRouter)
router.use('/', webRouter)

export default router
