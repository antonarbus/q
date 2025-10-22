import { navSlice } from '@entities/nav/navSlice'
import type { NavItem } from '@entities/nav/type'
import { dispatch } from '@shared/lib/redux'
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
