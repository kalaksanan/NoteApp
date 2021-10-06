const express = require('express')
const router = express.Router()
const {
  getNotes,
  createNotes,
  getNOteById,
  updateNote,
  deleteNote,
} = require('../controllers/noteController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getNotes)
router.route('/create').post(protect, createNotes)
router
  .route('/:id')
  .get(getNOteById)
  .put(protect, updateNote)
  .delete(protect, deleteNote)

module.exports = router
