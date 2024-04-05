import { dispatch, getState } from '@lib_instances/store'
import { type MouseEvent } from 'react'
import { copySlice } from '@entities/copy'
import { isItemsFroalaSignal } from '@entities/items'
import { boqRowKey } from '@entities/items/consts/boqRowKey'
import { nanoid } from '@shared/lib/nanoid'

export const addBoqRow = (e: MouseEvent): void => {
  const itemToCopy = {
    id: nanoid(3),
    type: boqRowKey.row,
    height: 50,
    width: 570,
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

  isItemsFroalaSignal.value = false

  dispatch(copySlice.actions.addItemIntoCopyContainer({
    copyItem: itemToCopy, preview: `
    <div class="boq-row MuiBox-root css-0" id="EtS"
  style="display: flex; flex-direction: column; justify-content: flex-end; position: relative; border-bottom: 1px solid rgb(232, 232, 232);">
  <div class="paste-here" style="opacity: 1; display: flex; align-items: stretch;">
    <div class="actions-container MuiBox-root css-nleyb3">
      <div class="MuiBox-root css-0"
        style="display: flex; flex-direction: column; scale: 0.5; transform-origin: center top;">
        <span tabindex="-1" style="color: rgb(0, 0, 0); cursor: move; transform: none;"><svg
            stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"
            height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path
              d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z">
            </path>
          </svg></span><span tabindex="-1" class="css-12g8118-CopyBoqRowIcon"
          style="transform: scale(1.73773) translateZ(0px);"><svg stroke="currentColor"
            fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em"
            xmlns="http://www.w3.org/2000/svg">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              d="M18 2H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H9V4h9v12zM3 15v-2h2v2H3zm0-5.5h2v2H3v-2zM10 20h2v2h-2v-2zm-7-1.5v-2h2v2H3zM5 22c-1.1 0-2-.9-2-2h2v2zm3.5 0h-2v-2h2v2zm5 0v-2h2c0 1.1-.9 2-2 2zM5 6v2H3c0-1.1.9-2 2-2z">
            </path>
          </svg></span><span tabindex="-1" class="css-1i3v4v3-CutBoqRowIcon"><svg
            stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
            stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M7 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
            <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
            <path d="M9.15 14.85l8.85 -10.85"></path>
            <path d="M6 4l8.85 10.85"></path>
          </svg></span><span tabindex="-1" style="color: rgb(0, 0, 0); cursor: pointer;"><svg
            stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 15 15" height="1em"
            width="1em" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
              fill="currentColor"></path>
          </svg></span></div>
    </div>
    <div class="td number MuiBox-root css-0"
      style="display: flex; align-items: flex-end; position: relative; width: 30px; max-width: 30px; min-width: 30px; font-size: 10px; color: grey; padding-bottom: 2px;">
      1.2</div>
    <div class="froala-wrapper td description MuiBox-root css-e4lg39">
      <div class="view-port-observer css-1af6z08-Froala">
        <div class="static-html fr-box fr-inline MuiBox-root css-0">
          <div class="fr-wrapper MuiBox-root css-0">
            <div class="fr-element fr-view MuiBox-root css-d7bto1"
              style="opacity: 0.5; word-break: break-word; position: absolute; width: 100%; visibility: hidden; text-align: left; padding: 30px 5px 0px; min-height: 50px;">
              <p>item 2</p>
            </div>
          </div>
        </div>
        <div class="editable-html MuiBox-root css-d7bto1 fr-box fr-inline" role="application"
          style="word-break: break-word; text-align: left; padding: 30px 5px 0px; min-height: 50px;">
          <div class="fr-wrapper" dir="auto">
            <div class="fr-element fr-view" dir="auto" contenteditable="true" aria-disabled="false"
              spellcheck="true">
              <p>item 2</p>
            </div><span class="fr-placeholder"
              style="font-size: 16px; line-height: 19.2px; margin-top: 0px; padding-top: 0px; padding-left: 0px; margin-left: 0px; padding-right: 0px; margin-right: 0px; text-align: left;">Description...</span>
          </div>
        </div>
      </div>
    </div>
    <div class="MuiBox-root css-kjafn5">
      <div class="froala-wrapper td itemPrice MuiBox-root css-zg09qa">
        <div class="view-port-observer css-1af6z08-Froala">
          <div class="static-html fr-box fr-inline MuiBox-root css-0">
            <div class="fr-wrapper MuiBox-root css-0">
              <div class="fr-element fr-view MuiBox-root css-17ppcoq"
                style="opacity: 0.5; word-break: break-word; position: absolute; width: 100%; visibility: hidden; text-align: center; padding: 30px 5px 0px; min-height: 50px;">
                <p>20 <span style="font-size: 16px; color: rgb(65, 168, 95);">$</span></p>
              </div>
            </div>
          </div>
          <div class="editable-html MuiBox-root css-17ppcoq fr-box fr-inline" role="application"
            style="word-break: break-word; text-align: center; padding: 30px 5px 0px; min-height: 50px;">
            <div class="fr-wrapper" dir="auto">
              <div class="fr-element fr-view" dir="auto" contenteditable="true"
                aria-disabled="false" spellcheck="true">
                <p>20 <span style="font-size: 16px; color: rgb(65, 168, 95);">$</span></p>
              </div><span class="fr-placeholder"
                style="font-size: 16px; line-height: 19.2px; margin-top: 0px; padding-top: 0px; padding-left: 0px; margin-left: 0px; padding-right: 0px; margin-right: 0px; text-align: center;">Item
                price...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="MuiBox-root css-kjafn5">
      <div class="froala-wrapper td qty MuiBox-root css-zg09qa">
        <div class="view-port-observer css-1af6z08-Froala">
          <div class="static-html fr-box fr-inline MuiBox-root css-0">
            <div class="fr-wrapper MuiBox-root css-0">
              <div class="fr-element fr-view MuiBox-root css-17ppcoq"
                style="opacity: 0.5; word-break: break-word; position: absolute; width: 100%; visibility: hidden; text-align: center; padding: 30px 5px 0px; min-height: 50px;">
                <p>2 <span style="font-size: 12px; color: rgb(61, 142, 185);">pcs</span></p>
              </div>
            </div>
          </div>
          <div class="editable-html MuiBox-root css-17ppcoq fr-box fr-inline" role="application"
            style="word-break: break-word; text-align: center; padding: 30px 5px 0px; min-height: 50px;">
            <div class="fr-wrapper" dir="auto">
              <div class="fr-element fr-view" dir="auto" contenteditable="true"
                aria-disabled="false" spellcheck="true">
                <p>2 <span style="font-size: 12px; color: rgb(61, 142, 185);">pcs</span></p>
              </div><span class="fr-placeholder"
                style="font-size: 16px; line-height: 19.2px; margin-top: 0px; padding-top: 0px; padding-left: 0px; margin-left: 0px; padding-right: 0px; margin-right: 0px; text-align: center;">Qty...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="MuiBox-root css-kjafn5">
      <div class="froala-wrapper td price MuiBox-root css-zg09qa">
        <div class="view-port-observer css-1af6z08-Froala">
          <div class="static-html fr-box fr-inline MuiBox-root css-0">
            <div class="fr-wrapper MuiBox-root css-0">
              <div class="fr-element fr-view MuiBox-root css-17ppcoq"
                style="opacity: 0.5; word-break: break-word; position: absolute; width: 100%; visibility: hidden; text-align: center; padding: 30px 5px 0px; min-height: 50px;">
                <p>40 <span style="font-size: 16px; color: rgb(65, 168, 95);">$</span></p>
              </div>
            </div>
          </div>
          <div class="editable-html MuiBox-root css-17ppcoq fr-box fr-inline" role="application"
            style="word-break: break-word; text-align: center; padding: 30px 5px 0px; min-height: 50px;">
            <div class="fr-wrapper" dir="auto">
              <div class="fr-element fr-view" dir="auto" contenteditable="true"
                aria-disabled="false" spellcheck="true">
                <p>40 <span style="font-size: 16px; color: rgb(65, 168, 95);">$</span></p>
              </div><span class="fr-placeholder"
                style="font-size: 16px; line-height: 19.2px; margin-top: 0px; padding-top: 0px; padding-left: 0px; margin-left: 0px; padding-right: 0px; margin-right: 0px; text-align: center;">Price...</span>
            </div>
          </div>
        </div>
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
