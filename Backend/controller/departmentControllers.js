const db = require('../config/db')

// Create Department
const createDepartment = (req, res) => {
  const { name } = req.body
  
  const sql = `INSERT INTO departments (name) VALUE(?)`

  db.query(sql, [name], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: err.message
      })
    }
    return res.status(201).json({
      message: 'Department registered successfully',
      id: results.insertId
    })
  })
}

//  Get Departments
const getDepartments = (req, res) => {
  const sql = `SELECT * FROM departments`

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: err.message
      })
    }
    return res.status(201).json({
      message: results
    })
  })
}

// Get A Department

const getDepartmentById = (req, res) => {
  const { id } = req.params

  const sql = `SELECT * FROM departments WHERE id = ?`

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message
      })
    }
    return res.status(201).json({
      department: result[0]
    })
  })
}
module.exports = { createDepartment, getDepartments, getDepartmentById }