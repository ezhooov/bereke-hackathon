import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import { AppLayout } from './AppLayout.jsx'
import { ErrorPage } from '../ErrorPage.jsx'
import { OrderPage } from './pages/OrderPage.jsx'
import { EmployeePage } from './pages/EmployeePage.jsx'
import { ConfigProvider } from 'antd'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'antd/dist/reset.css'
import { MainPage } from './pages/MainPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <MainPage />
      },
      {
        path: '/orders',
        element: <OrderPage />
      },
      {
        path: '/employees',
        element: <EmployeePage />
      }
    ]
  }
])

export const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={{
        token: {
          colorPrimary: '#43B741',
          colorLink: '#43B741'
        }
      }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
