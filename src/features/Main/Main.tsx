import { Outlet, Route, Routes } from 'react-router-dom'
import { Dummy } from '../temp/Dummy'

export const Main = () => (
  <main css={{ margin: '10px' }}>
    <Outlet />
    <Routes>
      <Route path="/*" element={<Dummy />} />
      <Route path="/div1" element={<div>div1</div>} />
    </Routes>
  </main>
)
