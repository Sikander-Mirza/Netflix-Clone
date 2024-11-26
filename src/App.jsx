import { useState } from 'react'
import './App.css'
import Router from '../config/route'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router/>
    </>
  )
}

export default App
