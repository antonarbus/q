import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { decrement, increment } from '@slices/counterSlice'
import { login } from '@slices/loginSlice'
import { fetchUsers } from '@slices/usersSlice'
import { useDispatchTyped, useSelectorTyped } from '@store/storeHooks'

/**
 * Component with counter
 * @returns component with react spinner
 */

export function DefaultViteComponent(): JSX.Element {
  const [count, setCount] = useState(0)
  const theme = useTheme()

  const counter = useSelectorTyped(state => state.counter.counter)
  const isLogged = useSelectorTyped(state => state.login.isLogged)
  const users = useSelectorTyped(state => state.users)
  const dispatch = useDispatchTyped()

  const style = { border: '2px solid grey', padding: '10px', margin: '10px', maxWidth: '500px' }

  return (
    <div style={{ border: `1px solid ${theme.colors.red}` }}>
      <img
        src={logo}
        className="App-logo"
        alt="logo"
        width="300px"
        height="auto"
      />
      <p>
        <Button
          onClick={() => setCount((count) => count + 1)}
        >
          count is: {count}
        </Button>
      </p>
      <img src="img.jpg" alt="farmers and robots" />

      <div style={style}>
        <h1>Redux</h1>
        <div>Counter: <strong>{counter}</strong></div>
        <button onClick={() => dispatch(increment(1))}>Increment +1</button>&#8194;
        <button onClick={() => dispatch(increment(5))}>Increment +5</button>&#8194;
        <button onClick={() => dispatch(decrement({ num: 1 }))}>Decrement -1</button>
        <button onClick={() => dispatch(decrement({ num: 3 }))}>Decrement -3</button>
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

const Button = styled.button`
  border-color:  ${props => props.theme.colors.red};
  background-color: ${props => props.theme.colors.grey};
  color: white;
  cursor: pointer;
`
