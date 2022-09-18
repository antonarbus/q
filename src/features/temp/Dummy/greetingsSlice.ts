import { createSlice } from '@reduxjs/toolkit'

type InitialState = {
  greeting: string
}

const initialState: InitialState = {
  greeting: 'no greetings yet'
}

const greetingsSlice = createSlice({
  name: 'greetingsSlice',
  initialState,
  reducers: {
    hi: (state, action) => {
      state.greeting = 'hi'
    },
    bye: (state, action) => {
      state.greeting = 'bye'
    },
    changeGreeting: (state, action) => {
      if (state.greeting === 'bye') state.greeting = 'hi'
      if (state.greeting === 'hi') state.greeting = 'bye'
      if (state.greeting === 'no greetings yet') state.greeting = 'hi'
    }
  }
})

export default greetingsSlice.reducer
export const { hi, bye, changeGreeting } = greetingsSlice.actions
