import { Outlet } from 'react-router-dom'
import type { JSX } from 'react'

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
