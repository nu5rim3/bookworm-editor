import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { ThemeProvider } from './context/themeProvider'
import UnAuthLayout from './layouts/UnAuthLayout'
import Login from './pages/unauth/login'
import React from 'react'
import DashBoard from './pages/auth/DashBoard'
import Book from './pages/auth/Book'
import BookRack from './pages/auth/BookRack'
import User from './pages/auth/User'
import Revenue from './pages/auth/Revenue'
import Settings from './pages/auth/Settings'
import Create from './pages/unauth/create'

function App() {

  return (

    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/auth" element={<UnAuthLayout />}>
          <Route index element={<Login />} />
          <Route
            path="login"
            element={
              <React.Suspense fallback={<div>loading</div>}>
                <Login />
              </React.Suspense>
            }
          />
          <Route
            path="create"
            element={
              <React.Suspense fallback={<div>loading</div>}>
                <Create />
              </React.Suspense>
            }
          />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashBoard />} />
          <Route
            path="dashboard"
            element={
              <React.Suspense fallback={<div>loading</div>}>
                <DashBoard />
              </React.Suspense>
            }
          />
          <Route
            path="book"
            element={
              <React.Suspense fallback={<div>loading</div>}>
                <Book />
              </React.Suspense>
            }
          />
          <Route
            path="book/:Id"
            element={
              <React.Suspense fallback={<div>loading</div>}>
                <Book />
              </React.Suspense>
            }
          />
          <Route
            path="books-shell"
            element={
              <React.Suspense fallback={<div>loading</div>}>
                <BookRack />
              </React.Suspense>
            }
          />
          <Route
            path="profile"
            element={
              <React.Suspense fallback={<div>loading</div>}>
                <User />
              </React.Suspense>
            }
          />
          <Route
            path="revenue"
            element={
              <React.Suspense fallback={<div>loading</div>}>
                <Revenue />
              </React.Suspense>
            }
          />
          <Route
            path="settings"
            element={
              <React.Suspense fallback={<div>loading</div>}>
                <Settings />
              </React.Suspense>
            }
          />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
