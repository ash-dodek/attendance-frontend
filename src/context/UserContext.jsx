import React, {createContext, useEffect, useState} from "react";


// const apiURL = 'http://localhost:3000'

const apiURL = import.meta.env.VITE_API_URL


const UserContext = createContext()

const UserProvider = ({children}) => {
    const [isLogged, setIsLogged] = useState(false)
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState()
    const [name, setName] = useState()
    const [password, setPassword] = useState()

    useEffect(() => {
        const checkLoginStatus = async(req, res) => {
            await fetch(apiURL+'/user/isLogged', {
              method: 'GET',
              credentials: 'include' // includes cookies
            })
            .then(async(response) => {
              if(await response.status == 200){
                const data = await response.json()
                
                setUsername(data.username)
                setName(data.name)
                setIsLogged(true)
                setLoading(false)
              }
              else{
                setIsLogged(false)
              }
              setLoading(false)
            })
          }
          checkLoginStatus()
      
    }, [])
    

    const loginUser = async(username, password) => {
        await fetch(apiURL+'/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                username, password
            })
        })
        .then(async(res) => {
            const data = await res.json()
            if(res.status == 200){
                setIsLogged(true)
                return data
            }
            else{
                console.log(data)
                throw new Error("Couldnt log in user");
            }
        })
        .then(data => {
            document.cookie = `accessToken=${data.accessToken}`
        })
        .catch(err => console.log(err))
    }


    const registerUser = async (name, username, password) => {
        await fetch(apiURL + '/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({name, username, password})
        })
        .then(res => {
            if(res.status == 200){
                return res.json()
            }
            else{
                throw new Error("Couldnt log in user");
            }
        })
        .then(data => {
            document.cookie = `accessToken=${data.accessToken}`
            setIsLogged(true)
            console.log("loggedin")
            return true
        })
        .catch(err => console.log(err))
    }

    const logoutUser = async (username) => {
        await fetch(apiURL + '/user/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({username})
        })
        .then(res => {
            if(res.status == 200){
                setIsLogged(false)
                return res.json()
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <UserContext.Provider value={{isLogged, setIsLogged, loginUser, registerUser, logoutUser, username, name, password, setLoading,loading}}>
            {children}
        </UserContext.Provider>
    )
}



export {UserContext, UserProvider}