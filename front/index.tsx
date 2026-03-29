import ReactDOM from 'react-dom/client'
import { App } from './app/App'

const rootElement = document.querySelector('#root')

if (rootElement instanceof Element === true) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<App />)
}
