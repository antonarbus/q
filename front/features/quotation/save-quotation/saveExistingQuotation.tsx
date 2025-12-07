import type { ErrorResBody } from '@back/api/quotation/saveQuotationHandler'
import { navItemId } from '@entities/nav/navItemId'
import { navSlice } from '@entities/nav/navSlice'
import { createLoadingMenuIconMachine } from '@entities/nav/state-machine/createLoadingMenuIconMachine'
import { saveQuotationMutationFn } from '@entities/quotation/api/useSaveQuotationMutation'
import { quotationSlice } from '@entities/quotation/redux/quotationSlice'
import type { Quotation } from '@entities/quotation/type'
import { route } from '@shared/lib/react-router-dom/route'
import { router } from '@shared/lib/react-router-dom/router'
import { dispatch, getState } from '@shared/lib/redux'
import type { AxiosError } from 'axios'
import { toast } from 'sonner'
import { createActor } from 'xstate'

const loadingMenuIconMachine = createLoadingMenuIconMachine({
  navItemId: navItemId.save,
  navItemNameWhileLoading: 'Saving...',
})

const loadingIconActor = createActor(loadingMenuIconMachine).start()

export const saveExistingQuotation = async (): Promise<void> => {
  if (getState().user.email === null) {
    toast.warning('Not logged in')

    return
  }

  // why?
  const quotation: Quotation = {
    ...getState().quotation,
    id: getState().quotation.id,
  }

  const isAbleToSave =
    getState().quotation.permissionLevel === 'Public' ||
    getState().quotation.permissionLevel === 'Shared with you'

  if (isAbleToSave === true) {
    void router.navigate(`./${route.save}`)

    return
  }

  loadingIconActor.send({ type: 'show loading icon' })

  try {
    const data = await saveQuotationMutationFn({ quotation })

    if (data.quotation !== undefined) {
      if (data.message === 'updated') {
        toast.info('Updated')
      }

      if (data.message === 'copied and saved') {
        toast.success(
          `Shared quotation was copied and saved under id ${data.quotation.id}`,
          {
            duration: 5000,
          },
        )
      }

      void router.navigate(`/${data.quotation.id}`)

      dispatch(
        quotationSlice.actions.loadQuotationReducer({
          quotation: data.quotation,
        }),
      )

      loadingIconActor.send({ type: 'show success icon' })
      dispatch(navSlice.actions.removeUnderlineFromTopNav())
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    toast.error((error as AxiosError<ErrorResBody>).response?.data.message)
    loadingIconActor.send({ type: 'show error icon' })
  }
}
