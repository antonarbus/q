import { dispatch } from '@lib_instances/store'
import { navSlice, type MenuItemType } from '@shared/nav'
import { useEffectOnce } from 'react-use'

type Props = {
  navStructure: MenuItemType[]
}

export const useLoadNavStructure = ({ navStructure }: Props): void => {
  useEffectOnce(() => {
    dispatch(navSlice.actions.addNavStructure({ navStructure }))
  })
}
