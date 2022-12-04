import React, { useEffect, useState } from 'react'
import axios from '../api/axios'

function Login() {
  const [users, setUsers] = useState()
  useEffect(() => {
    let isMounted = true;
    let controller = new AbortController()
    const getUsers =async () => {
      try {
        const response = await axios.get('./users', {
          signal: controller.signal
        })
        console.log(response.data);
        isMounted && setUsers(response.data)
      } catch (error) {
        console.log(error)
      }      
    }

    getUsers()
    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [])
  return (
    <div>Login controller</div>
  )
}

export default Login