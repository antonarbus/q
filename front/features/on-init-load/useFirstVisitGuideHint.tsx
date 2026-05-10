import { route } from '@front/shared/lib/react-router-dom/route'
import { useNavigate } from 'react-router-dom'
import { useEffectOnce } from 'react-use'
import { toast } from 'sonner'

const GUIDE_VISITED_KEY = 'guideVisited'

export const useFirstVisitGuideHint = (): void => {
  const navigate = useNavigate()

  useEffectOnce(() => {
    if (localStorage.getItem(GUIDE_VISITED_KEY) !== null) {
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
