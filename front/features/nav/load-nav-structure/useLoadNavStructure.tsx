import { dispatch } from '@shared/lib/redux'
import { navSlice } from '@shared/nav/navSlice'
import type { NavItem } from '@shared/nav/type'
import { useEffectOnce } from 'react-use'

type Props = {
  navStructure: NavItem[]
}

export const useLoadNavStructure = ({ navStructure }: Props): void => {
  useEffectOnce(() => {
    dispatch(navSlice.actions.addNavStructure({ navStructure }))
  })
}
