import express from 'express'

const router = express.Router()

/* GET Api. */
router.get('/', function(req, res, next) {
    res.json({
        success: true,
        data: {},
        msg: 'success',
    })
})

export default router
