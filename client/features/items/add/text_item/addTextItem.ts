import { dispatch, getState } from '@lib_instances/store'
import { type MouseEvent } from 'react'
import { copySlice } from '@entities/copy'
import { isItemsFroalaSignal } from '@entities/items'
import { itemKey } from '@entities/items/consts/itemKey'
import { nanoid } from '@shared/lib/nanoid'

export const addTextItem = (e: MouseEvent): void => {
  const itemToCopy = {
    id: nanoid(3),
    type: itemKey.text,
    width: 600,
    height: 79.2,
    isFroala: true,
    text: {
      html: '<p>Text, files & images</p>',
      value: null,
    },
  }

  isItemsFroalaSignal.value = false

  dispatch(copySlice.actions.addItemIntoCopyContainer({
    copyItem: itemToCopy,
    preview: `
      <div class="froala-wrapper  MuiBox-root">
        <div class="static-html fr-box fr-inline MuiBox-root">
          <div class="fr-wrapper MuiBox-root">
            <div class="fr-element fr-view MuiBox-root"
              style="padding: 30px 20px;">
              <p>Text, files &amp; images</p>
            </div>
          </div>
        </div>
      </div>
    `,
  }))

  const isCopyContainer = getState().copy.isCopyContainer

  if (!isCopyContainer) {
    dispatch(copySlice.actions.saveInitCordsOfCopyContainer({ x: e.clientX, y: e.clientY }))
    dispatch(copySlice.actions.showCopyContainer())
  }
}
