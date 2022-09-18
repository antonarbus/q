// redux-toolkit-demo/slices/usersSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

type Users = {
  id: string
  name: string
}

type InitialState = {
  loading: boolean,
  users: Users[],
  error: string
}

const initialState: InitialState = {
  loading: false,
  users: [],
  error: ''
}

// generates 'pending', 'fulfilled' & 'rejected' action types automatically
const fetchUsers = createAsyncThunk('users/fetchUsers', () => {
  return axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data)
})

const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.loading = true
    })

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false
      state.users = action.payload
      state.error = ''
    })

    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false
      state.users = []
      state.error = action.error.message || 'some error'
    })
  },
  reducers: {}
})

export default usersSlice.reducer
export { fetchUsers }
