import { dispatch } from '@shared/lib/redux'
import { navSlice, type NavItem } from '@shared/nav'
import { useEffectOnce } from 'react-use'

type Props = {
  navStructure: NavItem[]
}

export const useLoadNavStructure = ({ navStructure }: Props): void => {
  useEffectOnce(() => {
    dispatch(navSlice.actions.addNavStructure({ navStructure }))
  })
}
