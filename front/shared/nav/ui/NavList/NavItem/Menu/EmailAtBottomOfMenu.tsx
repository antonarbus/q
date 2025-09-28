import { useSelector } from '@shared/lib/redux'
import type { ReactNode } from 'react'

export const EmailAtBottomOfMenu = (): ReactNode => {
  const email = useSelector((state) => state.user.email)

  if (email === null) {
    return null
  }

  return (
    <span
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        color: 'grey',
        fontSize: '10px',
        paddingRight: '10px',
        paddingBottom: '5px',
        zIndex: 10,
      }}
    >
      {email}
    </span>
  )
}
