import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GlobalStyles } from './GlobalStyles'
import { RequireAuth } from '@features/credentials/RequireAuth'
import { Main } from '@features/main'
import { Nav } from '@features/nav'
import { Notifier } from '@features/notifier'
import { Login } from '@features/credentials/Login'
import { Register } from '@features/credentials/Register'
import { Reset } from '@features/credentials/Reset'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'
import { Logout } from '@features/credentials/Logout'
import { FourZeroFour } from '@features/application/FourZeroFour'
import { Test } from '@features/temp/Test'
import { CounterFromRedux } from '@features/counter'
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
