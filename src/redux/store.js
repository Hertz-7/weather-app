import { configureStore } from '@reduxjs/toolkit'
import savedReducer from './slice/savedSlice'
export const store = configureStore({
    reducer: {
        saved: savedReducer,
    },
})
