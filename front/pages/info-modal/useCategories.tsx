import { useGetBookmarkCategoryListQuery } from '@entities/bookmark'
import { useGetQuotationCategoryListQuery } from '@entities/quotation'
import { useParams } from 'react-router-dom'

type Res = {
  categories: string[]
}

export const useCategories = (): Res => {
  const { bookmarkId } = useParams()

  const { data: quotationCategoriesData } = useGetQuotationCategoryListQuery()
  const { data: bookmarkCategoriesData } = useGetBookmarkCategoryListQuery()

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
