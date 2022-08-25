import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import { theme } from './theme'
import { GlobalStyles } from './GlobalStyles'
import { Main } from './components/Main'
import { Nav } from '@components/Nav'
import { Notifier } from '@components/Notifier'
import { DefaultViteComponent } from '@components/Main/DefaultViteComponent'
import { Login } from '@components/Credentials/Login'
import { Register } from '@components/Credentials/Register'
import { ForgotPassword } from '@components/Credentials/ForgotPassword'
import { UpdatePassword } from '@components/Credentials/UpdatePassword'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <GlobalStyles />
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
            <Route path="updatePassword" element={<UpdatePassword />} />
            <Route path="default" element={<DefaultViteComponent />} />
          </Route>
        </Routes>
        <Notifier />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
)
