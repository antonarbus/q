import { setBackToQuotation } from '@entities/quotation'
import { route } from '@shared/const/route'
import { router } from '@shared/lib/react-router-dom'

export const openBookmarksPage = (): void => {
  setBackToQuotation() // todo: what does it do? bad name probably
  void router.navigate(`/${route.bookmarkList}`)
}
