import { type ReactNode } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { Offer } from '@pages/offer'
import { useRefreshTokens } from '@widgets/credentials'

export const Main = (): JSX.Element => {
  useRefreshTokens({ withLoadingState: false })

  return (
    <MainLayout>
      <Outlet />
      <Routes>
        <Route path='/*' element={<Offer />} />
        <Route path='dev' element={<div>dev</div>} />
      </Routes>
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
