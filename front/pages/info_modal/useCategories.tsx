import { useGetBookmarkCategoriesQuery } from '@entities/bookmark'
import { useGetQuotationCategoriesQuery } from '@entities/quotation'
import { useParams } from 'react-router-dom'

type Res = {
  categories: string[]
}

export const useCategories = (): Res => {
  const { bookmarkId } = useParams()

  const { data: quotationCategoriesData } = useGetQuotationCategoriesQuery()
  const { data: bookmarkCategoriesData } = useGetBookmarkCategoriesQuery()

  const quotationCategories = (
    quotationCategoriesData?.categories ?? []
  ).filter((cat) => cat !== undefined)

  const bookmarkCategories = (bookmarkCategoriesData?.categories ?? []).filter(
    (cat) => cat !== undefined,
  )

  const categories =
    bookmarkId === undefined ? quotationCategories : bookmarkCategories

  return { categories }
}
