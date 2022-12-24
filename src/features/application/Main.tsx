import { CounterFromRedux } from '@features/counter'
import { useRefreshTokens } from '@features/credentials/useRefreshTokens'
import { Offer } from '@features/offer/Offer'
import { Outlet, Route, Routes } from 'react-router-dom'

export const Main = () => {
  useRefreshTokens({ withLoadingState: false })
  return (
    <main
      css={{
        padding: '20px 10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px 0px'
      }}
    >
      <Outlet />
      <Routes>
        <Route path="/*" element={<Offer />} />
        <Route path="counter" element={<CounterFromRedux />} />
      </Routes>
    </main>
  )
}
