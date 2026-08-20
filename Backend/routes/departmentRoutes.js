const express = require('express')
const router = express.Router()

const { createDepartment } = require('../controller/departmentControllers')
const { getDepartments } = require('../controller/departmentControllers')
const { getDepartmentById } = require('../controller/departmentControllers')

router.post('/', createDepartment)
router.get('/', getDepartments)
router.get('/:id', getDepartmentById )

module.exports = router
