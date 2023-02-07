import { createSlice } from '@reduxjs/toolkit'

const documentsData = createSlice({
  name: 'documents',
  initialState: {
    documents: [],
  },
  reducers: {
    setData: (state, action) => {
      state.documents = action.payload
    },
  }
})

export const { setData } = documentsData.actions
export default documentsData
