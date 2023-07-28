import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
export const MainPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    console.log('123')
    navigate('/orders')
  }, [])

  return null
}
