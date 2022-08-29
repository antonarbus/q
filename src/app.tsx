import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GlobalStyles } from './GlobalStyles'
import { Main } from './components/Main'
import { Nav } from '@components/Nav'
import { Notifier } from '@components/Notifier'
import { DefaultViteComponent } from '@components/Main/DefaultViteComponent'
import { Login } from '@components/Credentials/Login'
import { Register } from '@components/Credentials/Register'
import { Reset } from '@components/Credentials/Reset'
import { UpdatePassword } from '@components/Credentials/UpdatePassword'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'

const themeMui = createTheme({
  palette: {
    primary: {
      main: '#757575'
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={themeMui}>
      <GlobalStyles />
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="reset" element={<Reset />} />
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
