import { type ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { Offer } from '@pages/offer'

export const Main = (): JSX.Element => {
  return (
    <MainLayout>
      <Offer />
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
        padding: '10px 20px',
      }}
    >
      {children}
    </main>
  )
}
