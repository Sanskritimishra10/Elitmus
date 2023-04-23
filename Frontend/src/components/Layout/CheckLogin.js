import { useRouter } from 'next/router';
import React from 'react'

const CheckLogin = () => {
    const Router =  useRouter()
    React.useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userdata'))
    if(userData)
    Router.push('/dashboard')
    else 
        Router.push('/auth/login')
        
    }, []);
  return (
    <div>CheckLogin</div>
  )
}

export default CheckLogin