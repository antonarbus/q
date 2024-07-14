import { dispatch, getState } from '@lib_instances/store'
import { type MouseEvent } from 'react'
import { copySlice } from '@entities/copy'
import { isFroalaSignal, boqRowKey, type BoqRow } from '@entities/quotation'
import { nanoid } from '@shared/lib/nanoid'

export const insertBoqRow = (e?: MouseEvent): void => {
  const boqRow: BoqRow = {
    id: nanoid(5),
    type: boqRowKey.row,
    height: 50,
    width: 570,
    preview: `
      <div class="boq-row MuiBox-root" id="ynT" style="display: flex; flex-direction: column; justify-content: flex-end; position: relative; border-bottom: 1px solid rgb(232, 232, 232);">
        <div class="paste-here" style="opacity: 1; display: flex; align-items: stretch;">
          <div class="td number MuiBox-root" style="display: flex; align-items: flex-end; position: relative; width: 30px; max-width: 30px; min-width: 30px; font-size: 10px; color: grey; padding-bottom: 2px;">1.1</div>
          <div class="froala-wrapper td description MuiBox-root" style="display: flex; align-items: flex-end; position: relative; width: 240px; max-width: 240px; min-width: 200px; cursor: pointer;">
            <div class="view-port-observer" style="width: 100%; position: relative;">
              <div class="editable-html MuiBox-root fr-box fr-inline" style="word-break: break-word; text-align: left; padding: 30px 5px 0px; min-height: 50px;">
                <div class="fr-wrapper">
                  <div class="fr-element fr-view">
                    <p>item 1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="MuiBox-root">
            <div class="froala-wrapper td itemPrice MuiBox-root" style="display: flex; align-items: flex-end; position: relative; width: 100px; max-width: 100px; min-width: 100px; cursor: pointer;">
              <div class="view-port-observer" style="width: 100%; position: relative;">
                <div class="editable-html MuiBox-root fr-box fr-inline" style="word-break: break-word; text-align: center; padding: 30px 5px 0px; min-height: 50px;">
                  <div class="fr-wrapper">
                    <div class="fr-element fr-view">
                      <p>10 <span style="font-size: 16px; color: rgb(65, 168, 95);">$</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="MuiBox-root">
            <div class="froala-wrapper td qty MuiBox-root" style="display: flex; align-items: flex-end; position: relative; width: 100px; max-width: 100px; min-width: 100px; cursor: pointer;">
              <div class="view-port-observer" style="width: 100%; position: relative;">
                <div class="editable-html MuiBox-root fr-box fr-inline" style="word-break: break-word; text-align: center; padding: 30px 5px 0px; min-height: 50px;">
                  <div class="fr-wrapper">
                    <div class="fr-element fr-view">
                      <p>1 <span style="font-size: 12px; color: rgb(61, 142, 185);">pcs</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="MuiBox-root">
            <div class="froala-wrapper td price MuiBox-root" style="display: flex; align-items: flex-end; position: relative; width: 100px; max-width: 100px; min-width: 100px; cursor: pointer;">
              <div class="view-port-observer" style="width: 100%; position: relative;">
                <div class="editable-html MuiBox-root fr-box fr-inline" style="word-break: break-word; text-align: center; padding: 30px 5px 0px; min-height: 50px;">
                  <div class="fr-wrapper">
                    <div class="fr-element fr-view">
                      <p>10 <span style="font-size: 16px; color: rgb(65, 168, 95);">$</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    description: {
      html: '<p>item 1</p>',
      value: 0,
      pin: {
        isPinned: false,
        isShown: false,
      },
    },
    itemPrice: {
      html: '<p>10 <span style="font-size: 16px; color: rgb(65, 168, 95);">$</span></p>',
      value: 10,
      pin: {
        isPinned: false,
        isShown: false,
      },
    },
    qty: {
      html: '<p>1 <span style="font-size: 12px; color: rgb(61, 142, 185);">pcs</span></p>',
      value: 1,
      pin: {
        isPinned: true,
        isShown: false,
      },
    },
    price: {
      html: '<p>10 <span style="font-size: 16px; color: rgb(65, 168, 95);">$</span></p>',
      value: 10,
      pin: {
        isPinned: false,
        isShown: false,
      },
    },
  }

  isFroalaSignal.value = false

  dispatch(copySlice.actions.addItemIntoCopyContainer({ item: boqRow }))

  const isCopyContainer = getState().copy.isCopyContainer

  if (!isCopyContainer) {
    dispatch(copySlice.actions.showCopyContainer())
  }
}
