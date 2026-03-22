import { navSlice } from '@front/entities/nav/navSlice'
import type { NavItem } from '@front/entities/nav/type'
import { dispatch } from '@front/shared/lib/redux'
import { useEffectOnce } from 'react-use'

type Props = {
  navStructure: NavItem[]
}

export const useLoadNavStructure = (props: Props): void => {
  useEffectOnce(() => {
    dispatch(
      navSlice.actions.addNavStructure({ navStructure: props.navStructure }),
    )
  })
}
