import React, { useContext, useState } from 'react'
import '../css/addAttendance.css'
import Button from './Button'
import { AttendanceContext } from '../context/AttendanceContext'
import { useNavigate } from 'react-router-dom'

function AddAttendance() {
  const navigate = useNavigate()
  const {addSubject} = useContext(AttendanceContext)
  const [days, setDays] = useState([])
  const [subject, setSubject] = useState()
  const selectHandler = (e) => {
    
    if(e.target.checked){
        setDays([...days, e.target.value])
    }
    else{
        setDays((prevDays) => prevDays.filter((day) => day !== e.target.value))
    }
  }
  const onChangeHandler= (e)=>{
    setSubject(e.target.value)
  }

  const addHandler = async ()  => {
    const didAdd = await addSubject(days, subject)
    if(didAdd === true){
      navigate('/attendance')
    }
    else{
      alert(`${didAdd.message}`)
    }
  }


  return (
    <div className="page">
      <div className="addAttendance">
        <span className="label">Subject Name</span>
        <input onChange={onChangeHandler} type="text" className='input' placeholder='Enter subject name or code' id="" />
          <label>Select days:</label><br/>
          <div className="daysInput">
            <input onChange={selectHandler} type="checkbox" name="mathDays" value="1"/>Monday<br/>
            <input onChange={selectHandler} type="checkbox" name="mathDays" value="2"/>Tuesday<br/>
            <input onChange={selectHandler} type="checkbox" name="mathDays" value="3"/>Wednesday<br/>
            <input onChange={selectHandler} type="checkbox" name="mathDays" value="4"/>Thursday<br/>
            <input onChange={selectHandler} type="checkbox" name="mathDays" value="5"/>Friday<br/>
          </div>
        <Button onClick={addHandler} buttonText='Add Subject' />
      </div>
    </div>
  )
}

export default AddAttendance