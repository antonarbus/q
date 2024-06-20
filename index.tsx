import ReactDOM from 'react-dom/client'
import { App } from './front/app/App'

const rootElement = document.getElementById('root') as Element
const root = ReactDOM.createRoot(rootElement)
root.render(<App />)
