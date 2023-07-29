import ReactDOM from 'react-dom/client'
import { App } from 'client/app/App'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

if (process.env.NODE_ENV === 'production') disableReactDevTools()

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
