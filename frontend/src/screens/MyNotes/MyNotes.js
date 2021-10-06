/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import MainScreen from '../../components/mainScreen'
import { Accordion, Badge, Button, Card, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteNoteAction, listNotes } from '../../action/notesAction'
import Loading from '../../components/loading/loading'
import Error from '../../components/errorScreen/errorScreen'
import ErrorMessage from '../../components/errorScreen/errorScreen'

const MyNotes = ({ search }) => {
  // const [notes, setNotes] = useState([])
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const dispatch = useDispatch()

  const noteList = useSelector((state) => state.noteList)
  const { loading, error, notes } = noteList

  console.log(notes)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const noteCreate = useSelector((state) => state.noteCreate)
  const { success: successCreate } = noteCreate

  const noteUpdate = useSelector((state) => state.noteUpdate)
  const { success: successUpdate } = noteUpdate

  const noteDelete = useSelector((state) => state.noteDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete

  const history = useHistory()

  const deleteHandler = (id) => {
    dispatch(deleteNoteAction(id))
    setShow(false)
  }

  // const fetchNotes = async () => {
  //   const { data } = await axios.get('/api/notes')
  //   setNotes(data)
  // }

  useEffect(() => {
    dispatch(listNotes())
    if (!userInfo) {
      history.push('/')
    }
  }, [dispatch, userInfo, history, successCreate, successUpdate, successDelete])

  return (
    <MainScreen title={`Welcome back ${userInfo.name}`}>
      <Link to='/createnote'>
        <Button size='lg' style={{ marginLeft: 10, marginBottom: 6 }}>
          Create New Note
        </Button>
      </Link>
      {error && <Error variant='danger'>{error}</Error>}
      {errorDelete && (
        <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {notes
        ?.reverse()
        .filter((filteredNote) =>
          filteredNote.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((note) => (
          <Accordion key={note._id}>
            <Card style={{ margin: 10 }}>
              <Card.Header style={{ display: 'flex' }}>
                <span
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                    flex: 1,
                    cursor: 'pointer',
                    alignSelf: 'center',
                    fontSize: 18,
                  }}
                >
                  <Accordion.Toggle as={Card.Text} variant='link' eventKey='0'>
                    {note.title}
                  </Accordion.Toggle>
                </span>
                <Button href={`/note/${note._id}`}>Edit</Button>
                <Button variant='danger' className='mx-2' onClick={handleShow}>
                  Delete
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Are you sure to delete ?</Modal.Body>
                  <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      variant='primary'
                      onClick={() => deleteHandler(note._id)}
                    >
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Card.Header>
              <Accordion.Collapse eventKey='0'>
                <Card.Body>
                  <h4>
                    <Badge variant='success'>category - {note.category}</Badge>
                  </h4>
                  <blockquote className='blockquote mb-0'>
                    <p>{note.content}</p>
                    <footer className='blockquote-footer'>
                      Created on{' '}
                      <cite title='Source Title'>
                        {note.createdAt.substring(0, 10)}
                      </cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ))}
    </MainScreen>
  )
}

export default MyNotes
