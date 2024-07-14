import { type ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <main
      style={{
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

export const Main = (): JSX.Element => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}
