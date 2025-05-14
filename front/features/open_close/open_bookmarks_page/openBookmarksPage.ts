import { setBackToQuotation } from '@entities/quotation'
import { route } from '@shared/consts/route'
import { router } from '@shared/lib/router'

export const openBookmarksPage = (): void => {
  setBackToQuotation() // todo: what does it do? bad name probably
  void router.navigate(`/${route.bookmarks}`)
}
