import { dispatch, getState } from '@lib_instances/store'
import { type MouseEvent } from 'react'
import { copySlice } from '@entities/copy'
import { isFroalaSignal, boqRowKey, itemKey } from '@entities/quotation'
import { nanoid } from '@shared/lib/nanoid'

export const insertBoqItem = (e?: MouseEvent): void => {
  const itemToCopy = {
    id: nanoid(5),
    type: itemKey.boq,
    width: 600,
    height: 267,
    isFroala: true,
    boq: {
      header: {
        title: {
          html: '<p><strong>Title 1</strong></p>',
          value: 0,
        },
        subtotalText: {
          html: '<div>Subtotal</div>',
          value: 0,
        },
        subTotalPrice: {
          html: '<p><strong>140</strong></p>',
          value: 140,
        },
      },
      column: {
        number: {
          html: '',
          width: 30,
        },
        description: {
          html: '<p><strong>Description</strong></p>',
          width: 240,
        },
        itemPrice: {
          html: '<p><strong>Item price</strong></p>',
          width: 100,
        },
        qty: {
          html: '<p><strong>Qty</strong></p>',
          width: 100,
        },
        price: {
          html: '<p><strong>Price</strong></p>',
          width: 100,
        },
      },
      rows: [
        {
          id: nanoid(5),
          type: boqRowKey.row,
          height: 0,
          width: 0,
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
        },
        {
          id: nanoid(5),
          type: boqRowKey.row,
          height: 0,
          width: 0,
          description: {
            html: '<p>item 2</p>',
            value: 0,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          itemPrice: {
            html: '<p>20 <span style="font-size: 16px; color: rgb(65, 168, 95);">$</span></p>',
            value: 20,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          qty: {
            html: '<p>2 <span style="font-size: 12px; color: rgb(61, 142, 185);">pcs</span></p>',
            value: 2,
            pin: {
              isPinned: true,
              isShown: false,
            },
          },
          price: {
            html: '<p>40 <span style="font-size: 16px; color: rgb(65, 168, 95);">$</span></p>',
            value: 40,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
        },
        {
          id: nanoid(5),
          type: boqRowKey.row,
          height: 0,
          width: 0,
          description: {
            html: '<p>service</p>',
            value: 0,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          itemPrice: {
            html: '<p>30 <span style="font-size: 16px; color: rgb(65, 168, 95);">$</span></p>',
            value: 30,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          qty: {
            html: '<p>3 <span style="font-size: 12px; color: rgb(61, 142, 185);">h</span></p>',
            value: 3,
            pin: {
              isPinned: true,
              isShown: false,
            },
          },
          price: {
            html: '<p>90 <span style="font-size: 16px; color: rgb(65, 168, 95);">$</span></p>',
            value: 90,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
        },
      ],
    },
  }

  isFroalaSignal.value = false

  dispatch(copySlice.actions.addItemIntoCopyContainer({
    copyItem: itemToCopy,
    preview: `
      <div class="MuiBox-root">
        <div class="layout title-subtotal MuiBox-root" style="display: flex; justify-content: space-between; align-items: flex-end; gap: 10px; background: rgba(52, 52, 52, 0.9); padding: 10px 15px; color: rgb(188, 188, 188); border-top-left-radius: 6px; border-top-right-radius: 6px;">
          <div class="layout item title MuiBox-root" style="flex-grow: 1;">
            <div class="froala-wrapper  MuiBox-root" style="cursor: pointer;">
              <div class="view-port-observer" style="width: 100%; position: relative;">
                <div class="editable-html MuiBox-root fr-box fr-inline" style="word-break: break-word; flex-grow: 1; min-height: 24px;">
                  <div class="fr-wrapper">
                    <div class="fr-element fr-view">
                      <p><strong>Title 1</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="layout subtotal-container MuiBox-root" style="display: flex; flex-direction: column; align-items: flex-end; min-width: 150px; flex-shrink: 0;">
            <div class="layout item subtotal-text MuiBox-root" style="width: 100%; text-align: right;">
              <div class="froala-wrapper  MuiBox-root" style="cursor: pointer;">
                <div class="view-port-observer" style="width: 100%; position: relative;">
                  <div class="editable-html MuiBox-root fr-box fr-inline" style="word-break: break-word; width: 100%; white-space: nowrap; text-align: right; min-height: 24px;">
                    <div class="fr-wrapper">
                      <div class="fr-element fr-view">
                        <div>Subtotal</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="layout price MuiBox-root" style="display: flex; justify-content: flex-end; align-items: baseline; gap: 10px; width: 100%;">
              <div class="layout item price MuiBox-root" style="text-align: right; white-space: nowrap; min-width: 60px;">
                <div class="froala-wrapper  MuiBox-root" style="cursor: pointer;">
                  <div class="view-port-observer" style="width: 100%; position: relative;">
                    <div class="editable-html MuiBox-root fr-box fr-inline"
                      style="word-break: break-word; width: 100%; min-width: 100px; white-space: nowrap; text-align: right; flex-shrink: 0; right: 0px; min-height: 24px;">
                      <div class="fr-wrapper">
                        <div class="fr-element fr-view">
                          <p><strong>140</strong></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="boq-table-container-with-paddings MuiBox-root" style="padding: 10px 10px 2px;">
        <div class="boq-table-container MuiBox-root" style="padding: 5px; clip-path: inset(0px 0px 0px -100px);">
          <div class="header tr MuiBox-root" style="display: flex; align-items: stretch; position: relative;">
            <div class="th number resizable" style="position: relative; user-select: auto; display: block; flex-grow: 0; width: 30px; height: auto; min-width: 30px; box-sizing: border-box; flex-shrink: 0;">
              <div class="MuiBox-root" style="flex-grow: 1; text-align: center; min-height: 24px; padding-inline: 5px;"></div>
              <div>
                <div style="position: absolute; user-select: none; width: 3px; height: 100%; top: 0px; cursor: col-resize; right: -1px; background: rgb(235, 233, 233); border-radius: 3px; z-index: 1;"></div>
              </div>
            </div>
            <div class="th description resizable" style="position: relative; user-select: auto; display: block; flex-grow: 0; width: 240px; height: auto; min-width: 200px; box-sizing: border-box; flex-shrink: 0;">
              <div class="froala-wrapper  MuiBox-root" style="cursor: pointer;">
                <div class="view-port-observer" style="width: 100%; position: relative;">
                  <div class="editable-html MuiBox-root fr-box fr-inline" style="word-break: break-word; flex-grow: 1; text-align: left; min-height: 24px; padding-inline: 5px;">
                    <div class="fr-wrapper">
                      <div class="fr-element fr-view">
                        <p><strong>Description</strong></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div style="position: absolute; user-select: none; width: 3px; height: 100%; top: 0px; cursor: col-resize; right: -1px; background: rgb(235, 233, 233); border-radius: 3px; z-index: 1;"></div>
              </div>
            </div>
            <div class="th itemPrice resizable" style="position: relative; user-select: auto; display: block; flex-grow: 0; width: 100px; height: auto; min-width: 100px; box-sizing: border-box; flex-shrink: 0;">
              <div class="froala-wrapper  MuiBox-root" style="cursor: pointer;">
                <div class="view-port-observer" style="width: 100%; position: relative;">
                  <div class="editable-html MuiBox-root fr-box fr-inline" style="word-break: break-word; flex-grow: 1; text-align: center; min-height: 24px; padding-inline: 5px;">
                    <div class="fr-wrapper">
                      <div class="fr-element fr-view">
                        <p><strong>Item price</strong></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div style="position: absolute; user-select: none; width: 3px; height: 100%; top: 0px; cursor: col-resize; right: -1px; background: rgb(235, 233, 233); border-radius: 3px; z-index: 1;"></div>
              </div>
            </div>
            <div class="th qty resizable" style="position: relative; user-select: auto; display: block; flex-grow: 0; width: 100px; height: auto; min-width: 100px; box-sizing: border-box; flex-shrink: 0;">
              <div class="froala-wrapper  MuiBox-root" style="cursor: pointer;">
                <div class="view-port-observer" style="width: 100%; position: relative;">
                  <div class="editable-html MuiBox-root fr-box fr-inline" style="word-break: break-word; flex-grow: 1; text-align: center; min-height: 24px; padding-inline: 5px;">
                    <div class="fr-wrapper">
                      <div class="fr-element fr-view">
                        <p><strong>Qty</strong></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div style="position: absolute; user-select: none; width: 3px; height: 100%; top: 0px; cursor: col-resize; right: -1px; background: rgb(235, 233, 233); border-radius: 3px; z-index: 1;"></div>
              </div>
            </div>
            <div class="th price resizable" style="position: relative; user-select: auto; display: block; flex-grow: 0; width: 100px; height: auto; min-width: 100px; box-sizing: border-box; flex-shrink: 0;">
              <div class="froala-wrapper  MuiBox-root" style="cursor: pointer;">
                <div class="view-port-observer" style="width: 100%; position: relative;">
                  <div class="editable-html MuiBox-root fr-box fr-inline" style="word-break: break-word; flex-grow: 1; text-align: center; min-height: 24px; padding-inline: 5px;">
                    <div class="fr-wrapper">
                      <div class="fr-element fr-view">
                        <p><strong>Price</strong></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div style="position: absolute; user-select: none; width: 3px; height: 100%; top: 0px; cursor: col-resize; right: -1px; background: rgb(235, 233, 233); border-radius: 3px; z-index: 1;"></div>
              </div>
            </div>
          </div>
          <div id="boq-rows" class="boq-rows" style="display: flex; flex-direction: column;">
            <div style="height: auto; opacity: 1; overflow: visible; transform: none;">
              <div class="boq-row MuiBox-root" id="PwR" style="display: flex; flex-direction: column; justify-content: flex-end; position: relative; border-bottom: 1px solid rgb(232, 232, 232);">
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
            </div>
            <div style="height: auto; opacity: 1; overflow: visible; transform: none;">
              <div class="boq-row MuiBox-root" id="Qak" style="display: flex; flex-direction: column; justify-content: flex-end; position: relative; border-bottom: 1px solid rgb(232, 232, 232);">
                <div class="paste-here" style="opacity: 1; display: flex; align-items: stretch;">
                  <div class="td number MuiBox-root" style="display: flex; align-items: flex-end; position: relative; width: 30px; max-width: 30px; min-width: 30px; font-size: 10px; color: grey; padding-bottom: 2px;">1.2</div>
                  <div class="froala-wrapper td description MuiBox-root" style="display: flex; align-items: flex-end; position: relative; width: 240px; max-width: 240px; min-width: 200px; cursor: pointer;">
                    <div class="view-port-observer" style="width: 100%; position: relative;">
                      <div class="editable-html MuiBox-root fr-box fr-inline" style="word-break: break-word; text-align: left; padding: 30px 5px 0px; min-height: 50px;">
                        <div class="fr-wrapper">
                          <div class="fr-element fr-view">
                            <p>item 2</p>
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
                              <p>20 <span style="font-size: 16px; color: rgb(65, 168, 95);">$</span></p>
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
                              <p>2 <span style="font-size: 12px; color: rgb(61, 142, 185);">pcs</span></p>
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
                              <p>40 <span style="font-size: 16px; color: rgb(65, 168, 95);">$</span></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style="height: auto; opacity: 1; overflow: visible; transform: none;">
              <div class="boq-row MuiBox-root" id="Ebx" style="display: flex; flex-direction: column; justify-content: flex-end; position: relative; border-bottom: 1px solid rgb(232, 232, 232);">
                <div class="paste-here" style="opacity: 1; display: flex; align-items: stretch;">
                  <div class="td number MuiBox-root" style="display: flex; align-items: flex-end; position: relative; width: 30px; max-width: 30px; min-width: 30px; font-size: 10px; color: grey; padding-bottom: 2px;">1.3</div>
                  <div class="froala-wrapper td description MuiBox-root" style="display: flex; align-items: flex-end; position: relative; width: 240px; max-width: 240px; min-width: 200px; cursor: pointer;">
                    <div class="view-port-observer" style="width: 100%; position: relative;">
                      <div class="editable-html MuiBox-root fr-box fr-inline" style="word-break: break-word; text-align: left; padding: 30px 5px 0px; min-height: 50px;">
                        <div class="fr-wrapper">
                          <div class="fr-element fr-view">
                            <p>service</p>
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
                              <p>30 <span style="font-size: 16px; color: rgb(65, 168, 95);">$</span></p>
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
                              <p>3 <span style="font-size: 12px; color: rgb(61, 142, 185);">h</span></p>
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
                              <p>90 <span style="font-size: 16px; color: rgb(65, 168, 95);">$</span></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
    dispatch(copySlice.actions.showCopyContainer())
  }
}
