import { CounterFromRedux } from '@features/counter'
import { Outlet, Route, Routes } from 'react-router-dom'
import { Dummy } from '../temp/Dummy'

export const Main = () => (
  <main css={{ margin: '10px' }}>
    {/* outlet renders routes from App on top of routes listed here */}
    <Outlet />
    <Routes>
      <Route path="/*" element={<Dummy />} />
      <Route path="counter" element={<CounterFromRedux />} />
      <Route path="/div1" element={<div>div1</div>} />
    </Routes>
  </main>
)
