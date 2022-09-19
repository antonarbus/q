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
import { Logout } from '@features/credentials/Logout'
import { Test } from '@features/temp/Test'
import { CounterFromRedux } from '@features/counter'
import { rememberLoggedUser } from '@features/credentials/credentialsSlice'
import { useEffectOnce } from 'react-use'
import axios from 'axios'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'

export const App = () => {
  useEffectOnce(() => {
    async function refreshTokens() {
      // todo: move function into 'credentials' folder
      try {
        if (!localStorage.getItem('accessJwtToken')) return console.log('user is not logged in')
        const response = await axios.get('/api/refresh', { withCredentials: true })
        const status = response.data.status
        if (status === 'error') {
          console.log(response.data.message)
          localStorage.removeItem('accessJwtToken')
        }
        const accessJwtToken = response.data.accessJwtToken
        if (!accessJwtToken) return console.log('no access token in db')
        const jwtTokenPayload: {email: string | undefined} = jwt_decode(accessJwtToken)
        const { email } = jwtTokenPayload
        if (!email) return console.log('token is invalid')
        localStorage.setItem('accessJwtToken', accessJwtToken)
        console.log(response)
        store.dispatch(rememberLoggedUser({ email, isLogged: true, role: 'viewer' }))
        console.log(`tokens for ${email} are refreshed`)
      } catch (error) {
        console.log(error)
      }
    }
    refreshTokens()
  })

  return (
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
              <Route path="logout" element={<Logout />} />
              <Route path="reset" element={<Reset />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="test" element={<Test />} />
            </Route>
          </Routes>
          <Notifier />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}
