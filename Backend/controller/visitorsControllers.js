const db = require('../config/db')

const createVisitor = (req, res) => {
  const { full_name, email,  phone_number, company, department_id, reason, purpose, person_to_visit, visitor_type, id_number, items_brought_in, id_type
} = req.body
  
  const sql = `INSERT INTO visitors (full_name, email, phone_number, company, department_id, reason, purpose, person_to_visit, visitor_type, id_number, items_brought_in, id_type) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`

  db.query(sql, [full_name, email,  phone_number, company, department_id, reason, purpose, person_to_visit, visitor_type, id_number, items_brought_in, id_type], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: err.message
      })
    }
    return res.status(201).json({
      message: 'Visitor registered successfully',
      id: results.insertId
    })
  })
}

const getVisitors = (req, res) => {

    const sql = `
        SELECT 
            visitors.*,
            departments.name AS department_name
        FROM visitors
        LEFT JOIN departments
            ON departments.id = visitors.department_id
        ORDER BY visitors.id DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        return res.status(200).json({
            message: results
        });

    });
};

const getVisitorById = (req, res) => {
  const { id } = req.params
  
  const sql = `SELECT * FROM visitors WHERE id=?`

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message
      })
    }
    return res.status(201).json({
      visitor: result[0]
    })
  })
}

const updateVisitor = (req, res) => {
  const { id } = req.params

   const { full_name, email,  phone_number, company, department_id, reason, purpose, person_to_visit, visitor_type, id_number, items_brought_in, id_type, 
} = req.body

  const sql = `UPDATE visitors SET full_name= ?, email = ?, phone_number = ?, company = ?, department_id = ?, reason = ?, purpose = ?, person_to_visit = ?, visitor_type = ?, id_number = ?, items_brought_in = ?, id_type = ? WHERE id=?`

  db.query(sql, [full_name, email,  phone_number, company, department_id, reason, purpose, person_to_visit, visitor_type, id_number, items_brought_in, id_type, id], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: err.message
      })
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({
        message: 'Visitor not found'
      })
    }
    return res.status(200).json({
      message: 'Visitor updated successfully',
    })
  })
}

const deleteVisitor = (req, res) => {
  const { id } = req.params
  
  const sql = `DELETE FROM visitors WHERE id = ?`

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(400).json({
        message: err.message
      })
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({
        message: 'Visitor not found'
      })
    }
    return res.status(200).json({
      message: 'Visitor deleted successfully'
    })
  })
}


const checkoutVisitor = (req, res) => {
    const { id } = req.params;

    const checkVisitorSql = `
        SELECT id, status
        FROM visitors
        WHERE id = ?
    `;

    db.query(checkVisitorSql, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Database error'
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: 'Visitor not found'
            });
        }

        if (results[0].status === 'checked_out') {
            return res.status(400).json({
                message: 'Visitor has already checked out'
            });
        }

        const updateSql = `
            UPDATE visitors
            SET check_out_time = NOW(),
                status = 'checked_out'
            WHERE id = ?
        `;

        db.query(updateSql, [id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: 'Failed to check out visitor'
                });
            }

            res.status(200).json({
                message: 'Visitor checked out successfully',
                visitor_id: id,
                check_out_time: new Date(),
                status: 'checked_out'
            });
        });
    });
};

module.exports = { createVisitor, getVisitors, getVisitorById, updateVisitor, deleteVisitor, checkoutVisitor }