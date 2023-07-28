import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
export const MainPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/orders')
  }, [])

  return null
}
