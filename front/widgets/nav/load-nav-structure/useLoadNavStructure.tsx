import { navSlice } from '@front/entities/nav/navSlice'
import type { NavItem } from '@front/entities/nav/type'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { useEffectOnce } from 'react-use'

type Props = {
  navStructure: NavItem[]
}

export const useLoadNavStructure = (props: Props): void => {
  useEffectOnce(() => {
    reduxHolder.dispatch(navSlice.actions.addNavStructure({ navStructure: props.navStructure }))
  })
}
