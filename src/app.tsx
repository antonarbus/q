import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GlobalStyles } from './GlobalStyles'
import { RequireAuth } from '@components/Credentials/RequireAuth'
import { Main } from './components/Main'
import { Nav } from '@components/Nav'
import { Notifier } from '@components/Notifier'
import { Login } from '@components/Credentials/Login'
import { Register } from '@components/Credentials/Register'
import { Reset } from '@components/Credentials/Reset'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'
import { Logout } from '@components/Credentials/Logout'
import { FourZeroFour } from '@components/FourZeroFour'
import { Test } from '@components/Test'
import { CounterFromRedux } from '@components/CounterFromRedux'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    {/* @ts-ignore */}
    <ThemeProvider theme={createTheme(theme)}> {/* by createTheme from MUI we set global style for all MUI elements */}
      <GlobalStyles />
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
            <Route path="reset" element={<Reset />} />
            <Route path="counter" element={<CounterFromRedux />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="test" element={<Test />} />
          </Route>
          <Route path="*" element={<FourZeroFour />} />
        </Routes>
        <Notifier />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
)
