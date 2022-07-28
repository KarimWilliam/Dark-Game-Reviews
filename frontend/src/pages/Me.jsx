import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import ReviewForm from '../components/ReviewForm'


function Me() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  useEffect(()=>{
    if (!user) {
      navigate('/')
    }
  })



  return (
    <>
    
    <ReviewForm />
    
    
    </>
  )
}

export default Me