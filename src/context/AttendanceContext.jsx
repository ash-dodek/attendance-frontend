import { createContext, useEffect, useState } from "react";
// const apiURL = 'http://localhost:3000'
const apiURL = import.meta.env.VITE_API_URL


const AttendanceContext = createContext();

const AttendanceProvider = ({ children }) => {

    const [subjectName, setSubjectName] = useState(null)


    const addSubject = async (days, subjectName) => {
        let res; 
        try {
            
            await fetch(apiURL+'/attendance/subject/add', {
                method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                subject: subjectName,
                days: days
            }),
            credentials: 'include'
            }).then(async(response) => {
                res = response
                return;
            })

        } catch (error) {
            console.log(error)
        }
        if(res.status === 200){
            return true
        }else{
            return await res.json()
        }
    }

    const getSubjects = async()=>{

        let res; 
        await fetch(apiURL+'/attendance/subjects', {
            method: 'GET',
            credentials: 'include'
        }).then(async(response) => {
            res = response
            return;
        })
        if(res.status === 200){
            return await res.json()
        }else{
            return await res.json()
        }
    }

    const renderSubjects = (res) => {
        return res?.map((subject) => {
            return <Class subject={subject.subject}/>
        })
    }

    const getSubjectDetails = async(subjectName) => {
        let res;
        await fetch(apiURL+'/attendance/find', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({subject: subjectName}),
        }).then(async(response) => {
            return await response.json()
        }).then(data => {
            res = data
            // return data
        })
        return res
    }

    const markAttendance = async(subject, date, status) => {
        let res;
        await fetch(apiURL+'/attendance/mark',{
            method:'POST',
            body: JSON.stringify({subject, date, status}),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        }).then(async(response) => {
            return await response.json()
        }).then(data => {
            res = data
        })
        return res
    }

    const editAttendance = async(subject, date, status) => {
        let res;
        await fetch(apiURL+'/attendance/edit',{
            method:'POST',
            body: JSON.stringify({subject, date, status}),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        }).then(async(response) => {
            return await response.json()
        }).then(data => {
            res = data
        })
        return res
    }

    return (
    <AttendanceContext.Provider value={{addSubject, getSubjects, renderSubjects, subjectName, setSubjectName, getSubjectDetails, markAttendance, editAttendance}}>
        {children}
    </AttendanceContext.Provider>
    )

}

export {AttendanceContext, AttendanceProvider}