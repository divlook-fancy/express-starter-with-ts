import express from 'express'
import { Schema, model, connection } from 'mongoose'
const router = express.Router()

let testSchema = new Schema({
    name: String,
})

let TestModel = model('Test', testSchema)

router.get('/', async function(req, res, next) {
    try {
        let docs = await TestModel.find().catch(() => [])

        res.json({
            success: true,
            data: {
                docs,
            },
            msg: 'success',
        })
    } catch (err) {
        console.error(err)
        res.json({
            success: false,
            data: {},
            msg: 'fail',
        })
    }
})

router.post('/', async function(req, res, next) {
    try {
        let data = new TestModel({
            ...req.body,
        })

        await data.save()

        res.json({
            success: true,
            data,
            msg: 'success',
        })
    } catch (err) {
        console.error(err)
        res.json({
            success: false,
            data: {},
            msg: 'fail',
        })
    }
})

router.delete('/', async function(req, res, next) {
    try {
        connection.dropCollection(TestModel.collection.collectionName)

        res.json({
            success: true,
            data: {},
            msg: 'success',
        })
    } catch (err) {
        console.error(err)
        res.json({
            success: false,
            data: {},
            msg: 'fail',
        })
    }
})

export default router
