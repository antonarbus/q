import { useGetBookmarkCategoryListQuery } from '@entities/bookmark/api/useGetBookmarkCategoryListQuery'
import { useGetQuotationCategoryListQuery } from '@entities/quotation'
import { useParams } from 'react-router-dom'

type Res = {
  categories: string[]
}

export const useCategories = (): Res => {
  const { bookmarkId } = useParams()
  const getQuotationCategoryListQuery = useGetQuotationCategoryListQuery()
  const getBookmarkCategoryListQuery = useGetBookmarkCategoryListQuery()

  const quotationCategories = (
    getQuotationCategoryListQuery.data?.categories ?? []
  ).filter((cat) => cat !== undefined)

  const bookmarkCategories = (
    getBookmarkCategoryListQuery.data?.categories ?? []
  ).filter((cat) => cat !== undefined)

  const categories =
    bookmarkId === undefined ? quotationCategories : bookmarkCategories

  return { categories }
}
