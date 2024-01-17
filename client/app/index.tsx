import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import ReactDOM from 'react-dom/client'
import { App } from './App'

if (process.env.NODE_ENV === 'production') disableReactDevTools()

const rootElement = document.getElementById('root') as Element
const root = ReactDOM.createRoot(rootElement)
root.render(<App />)
