import { createSlice } from '@reduxjs/toolkit'

const documentsData = createSlice({
  name: 'documents',
  initialState: {
    data: [],
    isFetching: false,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload
    },
    toggleIsFetching: (state, action) => {
      state.isFetching = action.payload
    }
  }
})

export const { setData, toggleIsFetching } = documentsData.actions
export default documentsData
