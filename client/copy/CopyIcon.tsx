import { useDispatchTyped } from 'client/store'
import { MdCopyAll } from 'react-icons/md'
import { saveInitCords, showCopyContainer } from './copySlice'

export const CopyIcon = () => {
  const dispatch = useDispatchTyped()

  return (
    <MdCopyAll
      css={{ cursor: 'pointer' }}
      onClick={(e: React.MouseEvent) => {
        dispatch(saveInitCords({ x: e.clientX, y: e.clientY }))
        dispatch(showCopyContainer())
      }}
    />
  )
}
