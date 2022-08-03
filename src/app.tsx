import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import { GlobalStyle } from './GlobalStyle'
import { Main } from './components/Main'
import { Nav } from '@components/Nav'
import { LinkA } from './routes/LinkA'
import { LinkB } from './routes/LinkB'
import { LinkC } from './routes/LinkC'
import { Notifier } from '@components/Notifier'
import { Register } from '@components/Register'
import { Login } from '@components/Login'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="linkA" element={<LinkA />} />
            <Route path="linkB" element={<LinkB />} />
            <Route path="linkC" element={<LinkC />} />
          </Routes>
          <Notifier />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  // </React.StrictMode>
)
