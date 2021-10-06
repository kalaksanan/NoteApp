const Note = require('../models/noteModels')
const asyncHandler = require('express-async-handler')

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find()
  res.json(notes)
})
const createNotes = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body

  if (!title || !content || !category) {
    res.status(400)
    throw new Error('Please Fill all the feilds')
  } else {
    const note = new Note({ user: req.user._id, title, content, category })

    const createNote = await note.save()
    res.status(201).json(createNote)
  }
})

const getNOteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id)

  if (note) {
    res.json(note)
  } else {
    res.status(404).json({ message: 'Note not found' })
  }
})

const updateNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body

  const note = await Note.findById(req.params.id)

  if (note.user.toString() !== note.user._id.toString()) {
    res.status(401)
    throw new Error("You can't perform this action")
  }

  if (note) {
    note.title = title
    note.content = content
    note.category = category

    const updatedNote = await note.save()
    res.json(updatedNote)
  } else {
    res.status(404)
    throw new Error('Note not found')
  }
})

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id)

  if (note.user.toString() !== note.user._id.toString()) {
    res.status(401)
    throw new Error("You can't perform this action")
  }

  if (note) {
    await note.remove()
    res.json({ message: 'Note removed' })
  } else {
    res.status(404)
    throw new Error('Note not found')
  }
})
module.exports = { getNotes, createNotes, getNOteById, updateNote, deleteNote }
