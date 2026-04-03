import type { ErrorResBody } from '@back/api/quotation/saveQuotationHandler'
import { navItemId } from '@front/entities/nav/navItemId'
import { navSlice } from '@front/entities/nav/navSlice'
import { createLoadingMenuIconMachine } from '@front/entities/nav/state-machine/createLoadingMenuIconMachine'
import { saveQuotationMutationFn } from '@front/entities/quotation/api/useSaveQuotationMutation'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import type { Quotation } from '@back/entity/quotation/schema'
import { route } from '@front/shared/lib/react-router-dom/route'
import { routerHolder } from '@front/shared/lib/react-router-dom/routerHolder'
import { reduxHolder } from '@front/shared/lib/redux'
import type { AxiosError } from 'axios'
import { toast } from 'sonner'
import { createActor } from 'xstate'

const loadingMenuIconMachine = createLoadingMenuIconMachine({
  navItemId: navItemId.save,
  navItemNameWhileLoading: 'Saving...',
})

const loadingIconActor = createActor(loadingMenuIconMachine).start()

export const saveExistingQuotation = async (): Promise<void> => {
  if (reduxHolder.getState().user.email === null) {
    toast.warning('Not logged in')

    return
  }

  // why?
  const quotation: Quotation = {
    ...reduxHolder.getState().quotation,
    id: reduxHolder.getState().quotation.id,
  }

  const isAbleToSave =
    reduxHolder.getState().quotation.permissionLevel === 'PUBLIC' ||
    reduxHolder.getState().quotation.permissionLevel === 'SHARED'

  if (isAbleToSave === true) {
    routerHolder.router.navigate(`./${route.save}`)

    return
  }

  loadingIconActor.send({ type: 'show loading icon' })

  try {
    const data = await saveQuotationMutationFn({ quotation })

    if (data.quotation !== undefined) {
      if (data.status === 'UPDATED') {
        toast.info('Updated')
      }

      if (data.status === 'COPIED') {
        toast.success(`Shared quotation was copied and saved under id ${data.quotation.id}`, {
          duration: 5000,
        })
      }

      routerHolder.router.navigate(`/${data.quotation.id}`)

      reduxHolder.dispatch(
        quotationSlice.actions.loadQuotation({
          quotation: { ...reduxHolder.getState().quotation, ...data.quotation },
        }),
      )

      loadingIconActor.send({ type: 'show success icon' })
      reduxHolder.dispatch(navSlice.actions.removeUnderlineFromTopNav())
    }
  } catch (error) {
    toast.error((error as AxiosError<ErrorResBody>).response?.data.message)
    loadingIconActor.send({ type: 'show error icon' })
  }
}
