import { CounterFromRedux } from '@features/counter'
import { Offer } from '@features/offer/Offer'
import { Outlet, Route, Routes } from 'react-router-dom'
import { Dummy } from '../temp/Dummy'

export const Main = () => (
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
      <Route path="/dummy" element={<Dummy />} />
      <Route path="counter" element={<CounterFromRedux />} />
      <Route path="div1" element={<div>div1</div>} />
    </Routes>
  </main>
)
