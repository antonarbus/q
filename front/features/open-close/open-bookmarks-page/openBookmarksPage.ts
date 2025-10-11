import { setBackToQuotation } from '@entities/quotation'
import { route } from '@shared/lib/react-router-dom/route'
import { router } from '@shared/lib/react-router-dom/router'

export const openBookmarksPage = (): void => {
  setBackToQuotation() // todo: what does it do? bad name probably
  void router.navigate(`/${route.bookmarkList}`)
}
