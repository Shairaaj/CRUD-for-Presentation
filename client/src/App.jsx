import { useEffect, useState } from 'react'
import './App.css'

function App() {
  
  const getUser=()=>{
    fetch("/getUser")
    .then((details)=> console.log(details))
    .catch((problem)=> console.log(`The error is: ${problem.message}`))
  }

  useEffect(()=>{
    getUser()
  },[])

  return (
    <>
        <p>Hello World</p>
    </>
  )
}

export default App
