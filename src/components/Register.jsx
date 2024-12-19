import React, { useContext, useState } from 'react'
import Button from './Button'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'





function Register() {
  const navigate = useNavigate()
  const {registerUser, isLogged} = useContext(UserContext)

  
  const [username, setUsername] = useState()
  const [name, setName] = useState()
  const [password, setPassword] = useState()
  
  const handleRegister = async (e) => {
    e.preventDefault()
    await registerUser(name, username, password)
    if(isLogged){
      navigate('/')
    }
  }
  
  const onUsernameChange = (e) => {
    e.preventDefault()
    setUsername(e.target.value)
  }
  const onPasswordChange = (e) => {
    e.preventDefault()
    setPassword(e.target.value)
  }
  const onNameChange = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }


  return (
    <div className='login'>
      <span className="heading">Register</span>
      
      <div className="inputSection">
        <span className="textLabel">Name</span>
        <input onChange={onNameChange} type="text" className='input' placeholder='Enter your name' id="" />
      </div>

      <div className="inputSection">
        <span className="textLabel">Username</span>
        <input onChange={onUsernameChange} type="text" className='input' placeholder='Enter a unique username(e.g user012)' id="" />
      </div>

      <div className="inputSection">
        <span className="textLabel">Password</span>
        <input onChange={onPasswordChange} type="text" className='input' placeholder='Enter password here' id="" />

      </div>
      <div className='endContents' >
        <Link to='/login'>
            <span>I already have an account</span>
        </Link>
        <Button onClick={handleRegister}  buttonText='Register'/>
      </div>
    </div>
  )
}

export default Register