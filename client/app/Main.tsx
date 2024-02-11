import { Outlet, Route, Routes } from 'react-router-dom'
import { Offer } from '@pages/offer'
import { useRefreshTokens } from '@widgets/credentials'

export const Main = (): JSX.Element => {
  useRefreshTokens({ withLoadingState: false })

  return (
    <main
      css={{
        display: 'flex',
        justifyContent: 'center',
        padding: '10px 20px',
      }}>
      <Outlet />
      <Routes>
        <Route path='/*' element={<Offer />} />
        <Route path='dev' element={<div>dev</div>} />
      </Routes>
    </main>
  )
}
