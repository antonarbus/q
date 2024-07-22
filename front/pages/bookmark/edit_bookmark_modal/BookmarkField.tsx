import type { ReactNode } from 'react'
import { useEffectOnce } from 'react-use'
import { isFroalaSignal } from '@entities/quotation'
import { BookmarkFieldLayout } from './BookmarkFieldLayout'

export const BookmarkField = (): ReactNode => {
  useEffectOnce(() => {
    isFroalaSignal.value = true
  })

  return <BookmarkFieldLayout>666</BookmarkFieldLayout>
}
