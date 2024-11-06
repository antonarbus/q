import { setBackToQuotation } from '@entities/quotation'
import { route } from '@shared/consts/route'
import { instance } from '@shared/instance'

export const openBookmarksPage = (): void => {
  setBackToQuotation()
  void instance.router.navigate(`/${route.bookmarks}`)
}
