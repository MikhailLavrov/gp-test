import { createSlice } from '@reduxjs/toolkit'

export const docsData = createSlice({
  name: 'documents',
  initialState: {
    data: [
      {
        "name": "Speedy Beaver",
        "quantity": 7,
        "deliveryDate": "2023-02-07T18:40:46.032Z",
        "price": 100,
        "currency": "PGK",
        "id": "1"
      }
    ],
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
