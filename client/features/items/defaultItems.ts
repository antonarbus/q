import { ItemsType } from './types'

export const defaultItems: ItemsType = [
  {
    id: 'id0',
    type: 'text editable',
    width: 800,
    height: 73,
    //! do not save html here, but add html and height into text prop to make it consistent with boq
    html: '<div>editable text</div>',
    msg: ''
  },
  {
    id: 'id1',
    type: 'boq',
    width: 700,
    height: 73,
    //! do not save html here
    //! just get html at copy click and add it into copy container item
    //! pass itemRef into copy
    html: '<div>boq</div>',
    msg: '',
    boq: {
      header: {
        title: {
          html: '<div style="font-weight: 600">Title</div>',
          height: 24
        }
      }
    }
  },
  {
    id: 'id2',
    type: 'text editable',
    width: 600,
    height: 73,
    html: '<div>editable text</div>',
    msg: ''
  },
  {
    id: 'id3',
    type: 'text editable',
    width: 500,
    height: 73,
    html: '<div>editable text</div>',
    msg: ''
  },
  {
    id: 'id4',
    type: 'text',
    width: 400,
    height: 73,
    html: '<div>not editable text</div>',
    msg: ''
  }
]
