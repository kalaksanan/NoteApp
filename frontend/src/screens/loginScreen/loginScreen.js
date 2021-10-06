/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loading from '../../components/loading/loading'
import ErrorScreen from '../../components/errorScreen/errorScreen'
import MainScreen from '../../components/mainScreen'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../action/userActions'

function loginScreen({ history }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      history.push('/mynotes')
    }
  }, [history, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <MainScreen title='LOGIN'>
      <div className='loginContainer'>
        {error && <ErrorScreen variant='danger'>{error}</ErrorScreen>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
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

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
        <Row className='py-3'>
          <Col>
            New Customer ? <Link to='/register'>Register Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  )
}

export default loginScreen
