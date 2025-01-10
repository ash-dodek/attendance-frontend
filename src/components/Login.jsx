import React, { useContext, useState } from 'react'
import '../css/login.css'
import Button from './Button'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

function Login() {
  const {loginUser, isLogged} = useContext(UserContext)
  const navigate = useNavigate()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const onUsernameChange = (e) => {
    e.preventDefault()
    setUsername(e.target.value.trim())
  }
  const onPasswordChange = (e) => {
    e.preventDefault()
    setPassword(e.target.value.trim())
  }
  
  const handleLogin = async (e) => {
    e.preventDefault()
    await loginUser(username, password)
    if(isLogged){
      navigate('/')
    }
  }

  return (

    <div className='login'>
      <span className="heading">Login</span>

      <div className="inputSection">
        <span className="textLabel">Username</span>
        <input onChange={onUsernameChange} type="text" className='input' placeholder='Enter a unique username(e.g user012)' id="" />
      </div>

      <div className="inputSection">
        <span className="textLabel">Password</span>
        <input onChange={onPasswordChange} type="text" className='input' placeholder='Enter password here' id="" />

      </div>
      <div className='endContents' >
        <Link to='/register'>
          <span>Create new account</span>
        </Link>

        <Button onClick = {handleLogin} buttonText='Login'/>

      </div>
    </div>

  )
}

export default Login