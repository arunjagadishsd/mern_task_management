import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

import Blank from './components/Blank/Blank'

import Master_Detail from './components/Master_Detail/Master_Detail'

import List from './components/List/List'

//TODO Web Template Studio: Add routes for your new pages here.
const App = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route exact path='/' component={List} />
        <Route path='/Master_Detail' component={Master_Detail} />
        <Route path='/List' component={List} />
      </Switch>
      <Footer />
    </React.Fragment>
  )
}

export default App
