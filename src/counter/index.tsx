import { Counter } from './Counter'
import logo from './logo.svg'
import { keyframes } from '@emotion/react'

const animation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0px);
  }
`

export const CounterFromRedux = () => (
  <div css={{ textAlign: 'center' }} >
    <header
      css={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(10px + 2vmin)'
      }}
    >
      <img
        src={logo}
        alt='logo'
        css={{
          height: '40vmin',
          pointerEvents: 'none',
          animation: `${animation} infinite 3s ease-in-out`
        }}
      />
      <Counter />
      <span>
        <span>Learn </span>
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
