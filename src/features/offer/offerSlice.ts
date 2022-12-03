import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: {
    'id 01': {
      position: 1,
      id: 'id 01',
      type: 'text',
      width: '800px',
      innerHtml: '<div>hello</div><div>hello</div><div>hello</div>'
    },
    'id 02': {
      position: 2,
      id: 'id 02',
      type: 'text',
      width: '800px',
      innerHtml: '<div>hello</div><div>hello</div><div>hello</div>'
    }
  }
}

export const offerSlice = createSlice({
  name: 'offerSlice',
  initialState,
  reducers: {
    saveWidth: (state, action) => {
      const { id, width } = action.payload
      state.items[id].width = width
    }
  }
})

export const { saveWidth } = offerSlice.actions
