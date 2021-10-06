/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import './landingPage.css'

const landingPage = ({ history }) => {
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      history.push('/mynotes')
    }
  }, [history])

  return (
    <div className='main'>
      <Container>
        <Row>
          <div className='intro-text'>
            <div>
              <h1 className='title'>Welcome to NoteApp</h1>
              <p className='subtitle'>One place to save for your note</p>
            </div>
            <div className='buttonContainer'>
              <a href='/login'>
                <Button
                  size='lg'
                  variant='outline-primary'
                  className='landingButton'
                >
                  Login
                </Button>
              </a>
              <a href='/register'>
                <Button
                  size='lg'
                  variant='outline-primary'
                  className='landingButton'
                >
                  Signup
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default landingPage
