const express = require('express')
const cors = require('cors')
const db = require('./config/db.js')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

const visitorRoutes = require('./routes/visitorsRoutes.js')
const departmentRoutes = require('./routes/departmentRoutes.js')

app.use('/api/visitors', visitorRoutes)
app.use('/api/departments', departmentRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on localhost ${PORT}`)
})