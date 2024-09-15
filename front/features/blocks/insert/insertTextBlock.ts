import { dispatch, getState } from '@lib_instances/store'
import type { MouseEvent } from 'react'
import { copySlice } from '@entities/copy'
import { type Text, isFroalaSignal, itemType } from '@entities/quotation'
import { nanoid } from '@shared/lib/nanoid'

export const insertTextBlock = (e?: MouseEvent): void => {
  const block: Text = {
    id: nanoid(5),
    type: itemType.text,
    email: 'john@mail.com',
    width: 600,
    height: 59.2,
    isFroala: true,
    preview: `
      <div class="froala-wrapper  MuiBox-root">
        <div class="static-html fr-box fr-inline MuiBox-root">
          <div class="fr-wrapper MuiBox-root">
            <div class="fr-element fr-view MuiBox-root"
              style="padding: 30px 20px;">
              <p>Add text, tables, drop images, files, links, select to format...</p>
            </div>
          </div>
        </div>
      </div>
    `,
    text: {
      html: '<p>Add text, tables, drop images, files, links, select to format...</p>',
      value: null,
    },
  }

  isFroalaSignal.value = false

  dispatch(copySlice.actions.addItemIntoCopyContainer({ item: block }))

  const isCopyContainer = getState().copy.isCopyContainer

  if (!isCopyContainer) {
    dispatch(copySlice.actions.showCopyContainer())
  }
}
