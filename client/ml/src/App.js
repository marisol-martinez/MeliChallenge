import React from 'react'
import {BrowserRouter as Router, Route, Routes, Switch} from "react-router-dom";
import RoutesSite from "./RoutesSite";
import './App.scss'

function App() {

  return (
    <>      
      <Router>
        <Routes>
          {RoutesSite.map((route, i) => <Route key={i} {...route} />)}
        </Routes>
      </Router>
    </>
  )
}

export default App