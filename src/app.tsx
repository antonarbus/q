import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import { Main } from './components/Main'
import { Nav } from '@components/Nav'
import { Login } from '@components/Login'
import { LinkA } from './routes/LinkA'
import { LinkB } from './routes/LinkB'
import { LinkC } from './routes/LinkC'
import { Footer } from './components/Footer'
import { Notifier } from '@components/Notifier'
// import './reset.css'
// import './app.css'
// import 'react-toastify/dist/ReactToastify.min.css'
import { Register } from '@components/Register'
import { GlobalStyle } from './GlobalStyle'

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
        <Footer />
        <Notifier />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
)
