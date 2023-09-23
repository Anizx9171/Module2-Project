import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const getProduct = createAsyncThunk("getProduct", async () => {
    const response = await axios.get("http://localhost:9171/products")
    return response.data
})
export const deleteProduct = createAsyncThunk("deleteProduct", async (id) => {
    await axios.delete(`http://localhost:9171/products/${id}`)
    return id
})
export const addNewProduct = createAsyncThunk("addNewProduct", async (newpro) => {
    await axios.post(`http://localhost:9171/products`, newpro)
    return newpro
})
export const updateProduct = createAsyncThunk("updateProduct", async (editpro) => {
    const { idEdit, ...data } = editpro
    await axios.put(`http://localhost:9171/products/${idEdit}`, data)
    return data
})

const productSlice = createSlice({
    name: "product",
    initialState: {
        data: [],
        mess: "No mess",
        isLoadingGet: false,
        isLoadingChange: false,
    },
    extraReducers: (builder) => {
        builder
            // get
            .addCase(getProduct.pending, (state) => {
                return {
                    ...state,
                    mess: "pending",
                    isLoadingGet: true
                }
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                return {
                    ...state,
                    mess: "ok",
                    data: action.payload,
                    isLoadingGet: false
                }
            })
            .addCase(getProduct.rejected, (state) => {
                return {
                    ...state,
                    mess: "no",
                    isLoadingGet: false
                }
            })
            // delete
            .addCase(deleteProduct.pending, (state) => {
                return {
                    ...state,
                    mess: "pending",
                    isLoadingChange: true
                }
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                return {
                    ...state,
                    mess: "ok",
                    isLoadingChange: false
                }
            })
            .addCase(deleteProduct.rejected, (state) => {
                return {
                    ...state,
                    mess: "no",
                    isLoadingChange: false
                }
            })
            // add
            .addCase(addNewProduct.pending, (state) => ({
                ...state,
                mess: "pending",
                isLoadingChange: true,
            }))
            .addCase(addNewProduct.fulfilled, (state) => ({
                ...state,
                mess: "ok",
                isLoadingChange: false,
            }))
            .addCase(addNewProduct.rejected, (state) => ({
                ...state,
                mess: "ko",
                isLoadingChange: false,
            }))
            //edit
            .addCase(updateProduct.pending, (state) => ({
                ...state,
                mess: "pending",
                isLoadingChange: true,
            }))
            .addCase(updateProduct.fulfilled, (state) => ({
                ...state,
                mess: "ok",
                isLoadingChange: false,
            }))
            .addCase(updateProduct.rejected, (state) => ({
                ...state,
                mess: "er",
                isLoadingChange: false,
            }))
    }
})

export default productSlice.reducer