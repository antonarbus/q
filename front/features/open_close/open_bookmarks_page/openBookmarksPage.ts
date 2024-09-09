import { setBackToQuotation } from '@entities/quotation'
import { route } from '@shared/consts/route'
import { router } from '@lib_instances/router'

export const openBookmarksPage = (): void => {
  setBackToQuotation()
  void router.navigate(`/${route.bookmarks}`)
}
