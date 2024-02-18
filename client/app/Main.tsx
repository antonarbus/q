import { Outlet, Route, Routes } from 'react-router-dom'
import { Offer } from '@pages/offer'
import { useRefreshTokens } from '@widgets/credentials'

export const Main = (): JSX.Element => {
  useRefreshTokens({ withLoadingState: false })

  return (
    <main
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '10px 0px 10px 10px',
      }}>
      <Outlet />
      <Routes>
        <Route path='/*' element={<Offer />} />
        <Route path='dev' element={<div>dev</div>} />
      </Routes>
    </main>
  )
}
