import Spinner from '../components/Spinner'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'


function Login() {

const [name,setName]=useState('')
const [password, setPassword]=useState('')

const {  isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )
const navigate = useNavigate()
const dispatch = useDispatch()


const onChangeName = (e) =>{
    setName(e.target.value)
}
const onChangePass = (e) =>{
    setPassword(e.target.value)
}

const onSubmit = (e) =>{
    e.preventDefault()
    dispatch( login({name:name,password:password}))
}
useEffect(()=>{
    if (isError) {
        toast.error(message)
      }
if(isSuccess){navigate('/')}
dispatch(reset())
},[isSuccess,isError,dispatch,message,navigate])

if (isLoading) {
    return <Spinner />
  }
    return (
        <>
          <section >
            <h1>
              <FaSignInAlt /> Login
            </h1>
          </section>
    
          <section >
            <form onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  type='name'
                  id='name'
                  name='name'
                  value={name}
                  placeholder='Enter your name'
                  onChange={onChangeName}
                />
              </div>
              <div >
                <input
                  type='password'
                  id='password'
                  name='password'
                  value={password}
                  placeholder='Enter password'
                  onChange={onChangePass}
                />
              </div>
    
              <div >
                <button type='submit' >
                  Submit
                </button>
              </div>
            </form>
          </section>
        </>
      )
    }

export default Login