import { type ReactNode } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { Offer } from '@pages/offer'
import { useGetAccessToken } from '@widgets/credentials'

export const Main = (): JSX.Element => {
  // ! maybe it was not a good idea to refresh token every time we hit the page
  // ! do it only for protected routes when 15 min is over
  useGetAccessToken({ withLoadingState: false })

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

type Props = {
  children: ReactNode
}

function MainLayout ({ children }: Props): JSX.Element {
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
