const express = require('express')
const router = express.Router()

const { createVisitor } = require('../controller/visitorsControllers')
const { getVisitors } = require('../controller/visitorsControllers')
const { getVisitorById } = require('../controller/visitorsControllers')
const { updateVisitor } = require('../controller/visitorsControllers')
const { deleteVisitor } = require('../controller/visitorsControllers')
const { checkoutVisitor } = require('../controller/visitorsControllers')

router.post('/', createVisitor)
router.get('/', getVisitors)
router.get('/:id', getVisitorById)
router.put('/:id', updateVisitor)
router.delete('/:id', deleteVisitor)
router.patch('/:id/checkout', checkoutVisitor)
module.exports = router
