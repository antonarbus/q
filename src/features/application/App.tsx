import { Provider } from 'react-redux'
import { store } from '../../store'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RequireAuth } from '@features/credentials/RequireAuth'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { GlobalStyles } from '../../GlobalStyles'
import { theme } from '../../theme'
import { Main } from '@features/main'
import { Nav } from '@features/nav'
import { Notifier } from '@features/notifier'
import { Login } from '@features/credentials/Login'
import { Register } from '@features/credentials/Register'
import { Reset } from '@features/credentials/Reset'
import { Test } from '@features/temp/Test'
import { refreshTokens } from '@features/credentials/refreshTokens'
import { Unauthorized } from '../credentials/Unauthorized'

refreshTokens()

export const App = () => (
  <Provider store={store}>
    {/* @ts-ignore */}
    <ThemeProvider theme={createTheme(theme)}> {/* by createTheme from MUI we set global style for all MUI elements */}
      <GlobalStyles />
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/*" element={<Main />}>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="reset" element={<Reset />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={['user']} />}>
            <Route path="test" element={<Test />} />
          </Route>
          <Route path="unauthorized" element={<Unauthorized />} />
        </Routes>
        <Notifier />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
)
