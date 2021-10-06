/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState, useEffect } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ErrorMessage from '../../components/errorScreen/errorScreen'
import Loading from '../../components/loading/loading'
import MainScreen from '../../components/mainScreen'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../../action/userActions'

const registerScreen = ({ history }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [pic, setPic] = useState(
    'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
  )
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [picMessage, setPicMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password do not match')
    } else {
      dispatch(register(name, email, password, pic))
    }
  }

  const postDetails = (pics) => {
    if (
      pics ===
      'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
    ) {
      return setPicMessage('Please select an Image')
    }
    setPicMessage(null)

    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData()
      data.append('file', pics)
      data.append('upload_preset', 'noteApp')
      data.append('colud_name', 'kalaksananronny')
      fetch('https://api.cloudinary.com/v1_1/kalaksananronny/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setPic(data.url.toString())
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      setPicMessage('Please select an Image')
    }
  }

  useEffect(() => {
    if (userInfo) {
      history.push('/')
    }
  }, [history, userInfo])
  return (
    <MainScreen title='REGISTER'>
      <div className='loginContainer'>
        {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
        {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              value={name}
              placeholder='Enter name'
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              value={email}
              placeholder='Enter email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              value={confirmPassword}
              placeholder='Confirm Password'
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {picMessage && (
            <ErrorMessage variant='danger'>{picMessage}</ErrorMessage>
          )}
          <Form.Group controlId='pic'>
            <Form.Label>Profile Picture</Form.Label>
            <Form.File
              onChange={(e) => postDetails(e.target.files[0])}
              id='custom-file'
              type='image/png'
              label='Upload Profile Picture'
              custom
            />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Register
          </Button>
        </Form>
        <Row className='py-3'>
          <Col>
            Have an Account ? <Link to='/login'>Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  )
}

export default registerScreen
