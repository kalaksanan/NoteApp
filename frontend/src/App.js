import './App.css'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import Landing from './screens/landingPage/landingPage'
import { BrowserRouter, Route } from 'react-router-dom'
import MyNotes from './screens/MyNotes/MyNotes'
import loginScreen from './screens/loginScreen/loginScreen'
import registerScreen from './screens/registerScreen/registerScreen'
import CreateNote from './screens/createNote/createNote'
import SingleNote from './screens/singleNote/singleNote'
import { useState } from 'react'
import profileScreen from './screens/profileScreen/profileScreen'
function App() {
  const [search, setSearch] = useState('')
  // console.log(search)
  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        <Route path='/' component={Landing} exact />
        <Route path='/mynotes' component={() => <MyNotes search={search} />} />
        <Route path='/login' component={loginScreen} />
        <Route path='/register' component={registerScreen} />
        <Route path='/profile' component={profileScreen} />
        <Route path='/createnote' component={CreateNote} />
        <Route path='/note/:id' component={SingleNote} />
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
