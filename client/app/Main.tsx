import { Offer } from 'client/pages/offer'
import { useRefreshTokens } from 'client/widgets/credentials'
import { Outlet, Route, Routes } from 'react-router-dom'

export const Main = (): JSX.Element => {
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
