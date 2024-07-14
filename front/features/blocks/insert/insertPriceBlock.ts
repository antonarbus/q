import { dispatch, getState } from '@lib_instances/store'
import { type MouseEvent } from 'react'
import { copySlice } from '@entities/copy'
import { type Item, isFroalaSignal, itemKey } from '@entities/quotation'
import { nanoid } from '@shared/lib/nanoid'

export const insertPriceBlock = (e?: MouseEvent): void => {
  const block: Item = {
    id: nanoid(5),
    type: itemKey.price,
    width: 150,
    height: 90,
    isFroala: true,
    preview: `
      <div class="MuiBox-root">
        <div class="layout price-header MuiBox-root"
          style="background: rgba(52, 52, 52, 0.9); padding: 15px; color: rgb(188, 188, 188); border-top-left-radius: 6px; border-top-right-radius: 6px; min-height: 50px;">
          <div class="froala-wrapper  MuiBox-root">
            <div class="editable-html MuiBox-root fr-box fr-inline" style="word-break: break-word;">
              <div class="fr-wrapper">
                <div class="fr-element fr-view">
                  <p style="text-align: center;"><strong>Total price</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="layout price-value MuiBox-root" style="padding: 10px 15px; min-height: 40px;">
        <div class="froala-wrapper  MuiBox-root">
          <div class="editable-html MuiBox-root fr-box fr-inline" style="word-break: break-word;">
            <div class="fr-wrapper">
              <div class="fr-element fr-view">
                <p style="text-align: center;">0 <span>USD</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    title: {
      html: '<p style="text-align: center;"><strong>Total price</strong></p>',
      value: null,
    },
    price: {
      html: '<p style="text-align: center;">0 <span>USD</span></p>',
      value: 0,
    },
  }

  isFroalaSignal.value = false

  dispatch(copySlice.actions.addItemIntoCopyContainer({ item: block }))

  const isCopyContainer = getState().copy.isCopyContainer

  if (!isCopyContainer) {
    dispatch(copySlice.actions.showCopyContainer())
  }
}
