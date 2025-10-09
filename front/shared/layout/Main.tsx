import type { JSX } from 'react'
import { Outlet } from 'react-router-dom'

export const Main = (): JSX.Element => {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '10px',
      }}
    >
      <Outlet />
    </main>
  )
}
