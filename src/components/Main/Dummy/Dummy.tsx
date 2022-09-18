import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { login } from '@slices/loginSlice'
import { fetchUsers } from '@slices/usersSlice'
import { useDispatchTyped, useSelectorTyped } from '@src/store'
import { theme } from '@src/theme'

/**
 * Component with counter
 * @returns component with react spinner
 */

export function Dummy(): JSX.Element {
  const [count, setCount] = useState(0)
  const isLogged = useSelectorTyped(state => state.login.isLogged)
  const users = useSelectorTyped(state => state.users)
  const dispatch = useDispatchTyped()
  const style = { border: '2px solid grey', padding: '10px', margin: '10px', maxWidth: '500px' }

  return (
    <div style={{ border: `1px solid ${theme.colors.grey}` }}>
      <img
        src={logo}
        className="App-logo"
        alt="logo"
        width="300px"
        height="auto"
      />
      <p>
        <button
          css={{ borderColor: theme.colors.grey, color: 'black', cursor: 'pointer' }}
          onClick={() => setCount((count) => count + 1)}
        >
          count is: {count}
        </button>
      </p>
      <img src="img.jpg" alt="farmers and robots" />

      <div style={style}>
        <div>isLogged: <strong>{isLogged.toString()}</strong></div>
        <button onClick={() => dispatch(login())}>Sign in/out</button><br />
        <button onClick={() => dispatch(fetchUsers())}>Fetch users</button><br />
        <div>
          {users.loading && 'Loading...'}
          {users.error && users.error}
          {!users.loading && !!users.users.length && users.users.map(user => <div key={user.id}>{user.name}</div>)}
        </div>
      </div>
    </div>
  )
}
