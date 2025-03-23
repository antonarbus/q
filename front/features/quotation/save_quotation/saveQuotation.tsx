import { dispatch, getState } from '@shared/lib/redux'
import { type Quotation, saveQuotationMutationFn } from '@entities/quotation'
import { navItemKey } from '@shared/consts/navItemKey'
import { createLoadingMenuIconMachine, navSlice } from '@shared/nav'
import { toast } from 'sonner'
import { createActor } from 'xstate'
import type { AxiosError } from 'axios'
import type { ResBody } from '@back/api/quotation/saveQuotationRouter'

const loadingMenuIconMachine = createLoadingMenuIconMachine({
  navItemKey: navItemKey.save,
})

const loadingIconActor = createActor(loadingMenuIconMachine).start()

export const saveQuotation = async (): Promise<void> => {
  const { email } = getState().user

  if (!email) {
    toast.warning('Not logged in')
  }

  const quotation: Quotation = {
    ...getState().quotation,
    id: getState().quotation.id,
  }

  loadingIconActor.send({ type: 'show loading icon' })

  try {
    const data = await saveQuotationMutationFn({ quotation })

    if (data.quotation !== undefined) {
      // if (data.message === 'saved') {
      //   toast.success(`Saved under id ${data.quotation.id}`, {
      //     position: 'bottom-center',
      //   })
      // }

      if (data.message === 'updated') {
        toast.info('Updated', { position: 'bottom-center' })
      }

      if (data.message === 'copied and saved') {
        toast.success('Shared quotation was copied and saved', {
          position: 'bottom-center',
        })
      }

      // void updateCategories()
      // void fetchQuotations()

      loadingIconActor.send({ type: 'show success icon' })
      dispatch(navSlice.actions.removeUnderlineFromTopNav())
    }
  } catch (error) {
    toast.error((error as AxiosError<ResBody>).response?.data.message)
    loadingIconActor.send({ type: 'show error icon' })
  }
}
