import ReactDOM from 'react-dom/client'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import { App } from './App'

if (process.env.NODE_ENV === 'production') disableReactDevTools()
const rootElement = document.getElementById('root')
if (rootElement instanceof Element) {
  ReactDOM.createRoot(rootElement).render(<App />)
}
