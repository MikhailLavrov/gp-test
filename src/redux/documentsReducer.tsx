import { createSlice } from '@reduxjs/toolkit'

const documentsData = createSlice({
  name: 'documents',
  initialState: {
    documents: [],
    isFetching: false,
  },
  reducers: {
    setData: (state, action) => {
      state.documents = action.payload
    },
    toggleIsFetching: (state, action) => {
      state.isFetching = action.payload
    }
  }
})

export const { setData, toggleIsFetching } = documentsData.actions
export default documentsData
