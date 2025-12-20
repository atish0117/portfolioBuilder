import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import portfolioReducer from './slices/portfolioSlice'
import themeReducer from './slices/themeSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    portfolio: portfolioReducer,
    theme: themeReducer,
  },
})

