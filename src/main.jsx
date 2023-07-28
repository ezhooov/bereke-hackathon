import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import { AppLayout } from './AppLayout.jsx'
import { ErrorPage } from '../ErrorPage.jsx'
import { MainPage } from './pages/MainPage.jsx'
import { ConfigProvider } from 'antd'

import 'antd/dist/reset.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <MainPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider>
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
)
