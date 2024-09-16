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
              <p>Add text, tables, drop images, drop <a href="/911.pdf" rel="noopener noreferrer" target="_blank">files</a>, links, select to <span style="color: rgb(226, 80, 65);">format</span>...</p>
            </div>
          </div>
        </div>
      </div>
    `,
    text: {
      html: '<p>Add text, tables, drop images, drop <a href="/911.pdf" rel="noopener noreferrer" target="_blank">files</a>, links, select to <span style="color: rgb(226, 80, 65);">format</span>...</p>',
      value: null,
    },
  }

  isFroalaSignal.value = false

  dispatch(copySlice.actions.addItem({ item: block }))

  const isCopyModalVisible = getState().copy.isVisible

  if (!isCopyModalVisible) {
    dispatch(copySlice.actions.showCopyModal())
  }
}
