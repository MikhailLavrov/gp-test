import { createSlice } from '@reduxjs/toolkit'

export const docsData = createSlice({
  name: 'documents',
  initialState: {
    data: [],
    setLoading: true,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { setData } = docsData.actions

export default docsData.reducer
