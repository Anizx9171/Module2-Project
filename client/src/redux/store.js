import { configureStore } from "@reduxjs/toolkit"
import userSlice from './slice/usersSlice';
import CategotySlice from './slice/categoriesSlice'
import productSlice from './slice/productsSlice'

export const store = configureStore({
    reducer: {
        user: userSlice,
        category: CategotySlice,
        product: productSlice,
    }
})