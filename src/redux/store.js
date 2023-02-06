import { configureStore } from '@reduxjs/toolkit'
import docsDataReducer from './docsReducer.tsx'

export default configureStore({
  reducer: {
    documents: docsDataReducer,
  }
});
