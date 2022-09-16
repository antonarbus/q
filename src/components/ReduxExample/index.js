import { Counter } from './Counter'
import logo from './logo.svg'
import './counter.css'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { hideLoader, showLoader } from '../../store/loaderSlice'
import { useEffectOnce } from 'react-use'

export function ReduxExample () {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  useEffectOnce(() => {
    i18n.changeLanguage('en-US')
    enqueueSnackbar(t('message.error.general'), { variant: 'error', persist: true })
    setTimeout(closeSnackbar, 4000)
  })

  useEffectOnce(() => {
    dispatch(showLoader())
    setTimeout(() => dispatch(hideLoader()), 2000)
  })

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <Counter />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span css={{ background: 'red' }}>Learn </span>
          <a
            className='App-link'
            href='https://reactjs.org/'
            target='_blank'
            rel='noopener noreferrer'
          >
            React
          </a>
          <span>, </span>
          <a
            className='App-link'
            href='https://redux.js.org/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Redux
          </a>
          <span>, </span>
          <a
            className='App-link'
            href='https://redux-toolkit.js.org/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className='App-link'
            href='https://react-redux.js.org/'
            target='_blank'
            rel='noopener noreferrer'
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  )
}
