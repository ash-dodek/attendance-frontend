import React, { useContext, useEffect, useState } from 'react'
import '../css/attendancePage.css'
import Class from './Class'
import Button from './Button'
import { Link, useNavigate } from 'react-router-dom'
import { AttendanceContext } from '../context/AttendanceContext'


function AttendancePage() {
  const navigate = useNavigate()
  const [res, setRes] = useState([])
  const {getSubjects, setSubjectName, subjectName} = useContext(AttendanceContext)
//   let res;
  useEffect(() => {
    const fetchSubjects = async()=>{
        setRes(await getSubjects())
        
    }
    fetchSubjects()
    
  }, [])
  
  const onClickSubject = (subjName)=> {
    setSubjectName(subjName)
    navigate(`/subject/details/${subjName}` )
  }

  return (
    <div className='attendancePage'>
        <h1 id="title">Attendance Records</h1>
        <hr />

        <div className="classes">
            <div className="texts">
                <h1 id='title' style={{fontSize:'23px', marginTop:'30px'}}>Classes</h1>
                <Button onClick={() => navigate('/subject/add')} buttonText='Add Subject'/>
            </div>

            <div className="subjects">
                    { res?.length === 0? <div className="noSubjects">Add Subjects to start tracking them now</div>:
                        res?.map((subject) => {
                            return <Class subjectId={subject._id} onClick={() => onClickSubject(subject.subject)} key={subject._id} subject={subject.subject}/>
                        })
                    }
            </div>
        </div>
    </div>
  )
}

export default AttendancePage