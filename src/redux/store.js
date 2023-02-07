import { configureStore } from '@reduxjs/toolkit'
import documentsData from './documentsReducer.tsx'

const store = configureStore({
  reducer: documentsData.reducer
})

export default store;

store.subscribe(() => console.log(store.getState()))
