import { type ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

export const Main = (): JSX.Element => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}

function MainLayout ({ children }: { children: ReactNode }): JSX.Element {
  return (
    <main
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '10px',
      }}
    >
      {children}
    </main>
  )
}
