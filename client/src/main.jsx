import React from 'react'
import ReactDOM from 'react-dom/client'
import { Layout } from './pages/Layout'
import './index.css'
import 'vite/modulepreload-polyfill'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { Dashboard } from './pages/Dashboard'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Dashboard />
            }
        ]
    }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}></RouterProvider>
)
