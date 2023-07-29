import { useRefreshTokens } from 'client/features/credentials/useRefreshTokens'
import { Offer } from 'client/pages/offer'
import { Outlet, Route, Routes } from 'react-router-dom'

export const Main = () => {
  useRefreshTokens({ withLoadingState: false })

  return (
    <main css={{ padding: '1px 20px' }}>
      <Outlet />
      <Routes>
        <Route path='/*' element={<Offer />} />
        <Route path='dev' element={<div>dev</div>} />
      </Routes>
    </main>
  )
}
