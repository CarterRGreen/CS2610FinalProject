import React from 'react'
import ReactDOM from 'react-dom/client'
import { Layout } from './pages/Layout'
import './index.css'
import 'vite/modulepreload-polyfill'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { Dashboard } from './pages/Dashboard'
import { Collection } from './pages/Collection'
import { Wanted } from './pages/Wanted'
import { Decks } from './pages/Decks'
import { Search } from './pages/Search'
import { Card } from './pages/Card'
import { CreateDeck } from './pages/CreateDeck'
import { Deck } from './pages/Deck'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Dashboard />
            },
            {
                path: "/collection",
                element: <Collection />
            },
            {
                path: "/wanted",
                element: <Wanted />
            },
            {
                path: "/decks",
                element: <Decks />
            },
            {
                path: "/search",
                element: <Search />
            },
            {
                path: "/card/:id",
                element: <Card />
            },
            {
                path: "/create_deck",
                element: <CreateDeck />
            },
            {
                path: "/deck/:id",
                element: <Deck />
            },
        ]
    }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}></RouterProvider>
)
