import { dispatch } from '@lib_instances/store'
import { useEffect, type ReactNode } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useEffectOnce } from 'react-use'
import { Offer } from '@pages/offer'
import { itemsSlice } from '@entities/items'
import { type Item } from '@entities/items/types'
import { type Quotation, quotationSignal } from '@entities/quotation'
import { localStorageKey } from '@shared/consts/localStorageKey'
import { jsonParseSafe } from '@shared/lib/jsonParseSafe'

export const Main = (): JSX.Element => {
  const { pathname } = useLocation()
  useEffect(() => {
    if (pathname !== '/') return
    console.log(666)
    const itemsFromLocalStorage = localStorage.getItem(localStorageKey.items)
    const quotationFromLocalStorage = localStorage.getItem(localStorageKey.quotation)

    if (itemsFromLocalStorage !== null && quotationFromLocalStorage !== null) {
      const items = jsonParseSafe<Item[]>(itemsFromLocalStorage)
      if (items !== undefined) {
        dispatch(itemsSlice.actions.loadItemsReducer({ items }))
      }

      const quotation = jsonParseSafe<Quotation>(quotationFromLocalStorage)
      if (quotation !== undefined) {
        quotationSignal.value = quotation
      }

      // if (quotation?.id !== id) {
      //   setEnabled(true)
      // }
    }
  }, [pathname])

  return (
    <MainLayout>
      <Offer />
      <Outlet />
    </MainLayout>
  )
}

function MainLayout ({ children }: { children: ReactNode }): JSX.Element {
  return (
    <main
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '10px 20px',
      }}
    >
      {children}
    </main>
  )
}
