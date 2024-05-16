import { router } from '@lib_instances/Router'
import { route } from '@shared/consts/route'

export const openBookmarksPage = (): void => {
  void router.navigate(`/${route.bookmarks}`)
}
