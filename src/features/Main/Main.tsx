import { CounterFromRedux } from '@features/counter'
import { useRefreshTokens } from '@features/credentials/useRefreshTokens'
import { Offer } from '@features/offer/Offer'
import { Outlet, Route, Routes } from 'react-router-dom'
import { Dummy } from '../temp/Dummy'

export const Main = () => {
  useRefreshTokens()

  return (
    <main
      css={{
        margin: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Outlet />
      <Routes>
        <Route path="/*" element={<Offer />} />
        <Route path="/dummy" element={<Dummy />} />
        <Route path="counter" element={<CounterFromRedux />} />
        <Route path="div1" element={<div>div1</div>} />
      </Routes>
    </main>
  )
}
