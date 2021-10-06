const express = require('express')
const notes = require('./data/notes')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes.js')
const noteRoutes = require('./routes/noteRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const path = require('path')

dotenv.config()
connectDB()

const app = express()
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/notes', noteRoutes)

// app.get('/', (req, res) => {
//   res.send(`API is running on port ${PORT}`)
// })

// app.get('/api/notes', (req, res) => {
//   res.json(notes)
// })

// app.get('/api/notes/:id', (req, res) => {
//   const note = notes.find((n) => n._id === req.params.id)
//   res.send(note)
// })

// --------------------------deployment------------------------------
const dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running..')
  })
}
// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server run on port ${PORT}`))
