import { Outlet } from 'react-router-dom'

type Props = {
  children: React.ReactNode
}

const MainLayout = ({ children }: Props): JSX.Element => {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '10px',
      }}
    >
      {children}
    </main>
  )
}

export const Main = (): JSX.Element => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}
