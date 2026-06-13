import { useIsEditorView } from '@front/entities/quotation/util/useIsEditorView'
import { localStorageKeys } from '@front/shared/lib/local-storage/localStorageKeys'
import { route } from '@front/shared/lib/react-router-dom/route'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { useNavigate } from 'react-router-dom'
import { useEffectOnce } from 'react-use'
import { toast } from 'sonner'

export const useProposeWelcomeGuide = (): void => {
  const navigate = useNavigate()
  const isEditorView = useIsEditorView()

  useEffectOnce(() => {
    if (isEditorView === false) {
      return undefined
    }

    const { permissionLevel } = reduxHolder.getState().quotation

    if (permissionLevel === 'PUBLIC' || permissionLevel === 'SHARED') {
      return undefined
    }

    if (localStorage.getItem(localStorageKeys.guideVisited) !== null) {
      return undefined
    }

    const timeoutId = setTimeout(() => {
      toast('New here?', {
        style: { width: '200px', left: 0, right: 0, marginInline: 'auto' },
        action: {
          label: 'Show guide',
          onClick: () => {
            void navigate(`./${route.welcomeGuide}`)
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
