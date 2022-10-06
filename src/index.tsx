import ReactDOM from 'react-dom/client'
import { App } from '@features/application/App'
import { Provider } from 'react-redux'
import { store } from './store'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

if (process.env.NODE_ENV === 'production') disableReactDevTools()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
