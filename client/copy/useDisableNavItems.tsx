import { useDispatchTyped, useSelectorTyped } from 'client/store'
import { useEffectOnce, useUnmount } from 'react-use'
import { setNavItemProp } from 'client/nav/navSlice'

export const useDisableNavItems = () => {
  const dispatch = useDispatchTyped()
  const navItemIds = useSelectorTyped(state => state.nav.navStructure[0].menuItems?.map(item => item.id))

  useEffectOnce(() => {
    navItemIds?.forEach((id) => {
      if (id === 'Offers') return
      dispatch(setNavItemProp({ id, prop: 'disabled', value: true }))
    })
  })

  useUnmount(() => {
    navItemIds?.forEach((id) => {
      dispatch(setNavItemProp({ id, prop: 'disabled', value: false }))
    })
  })
}
