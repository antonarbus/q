import { localStorageKeys } from '@front/shared/lib/local-storage/localStorageKeys'
import { route } from '@front/shared/lib/react-router-dom/route'
import { useNavigate } from 'react-router-dom'
import { useEffectOnce } from 'react-use'
import { toast } from 'sonner'

export const useFirstVisitGuideHint = (): void => {
  const navigate = useNavigate()

  useEffectOnce(() => {
    if (localStorage.getItem(localStorageKeys.guideVisited) !== null) {
      return
    }

    const timeoutId = setTimeout(() => {
      toast('New here? Want to see how it works?', {
        action: {
          label: 'Show',
          onClick: () => {
            navigate(`./${route.welcomeGuide}`)
          },
        },
        duration: 10_000,
      })
    }, 3000)

    return (): void => {
      clearTimeout(timeoutId)
    }
  })
}
