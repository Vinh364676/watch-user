import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryService from "../../services/category/category.service";
import { CategoryState } from "../../@types/category";
import historyService from "../../services/history/history.service";
import { HistoryState } from "../../@types/history";

export const getHistory = createAsyncThunk(
    "get/getHistory",
    async (params: any) => {
      const { data } = await historyService.get(params);
      return data;
    }
  );
  
  export const deleteHistory = createAsyncThunk(
    "delete/deleteHistory",
    async (id: number) => {

      await historyService.delete(id);
      return id; 
    }
  );
  export const createHistory = createAsyncThunk(
    "create/createHistory",
    async (HistoryDate: any) => {
      const { data } = await historyService.post(HistoryDate);
      return data;
    }
  );
  export const updateHistory = createAsyncThunk(
    "update/upateHistory",
    async (data: any) => {
      // Assuming you have a service function for updating a brand
      const { data: updatedBrand } = await historyService.put(data.id, data);
      return updatedBrand;
    }
  );
  export const getByIdHistory = createAsyncThunk(
    "get/getByIDHistory",
    async (id: any) => {
      const { data } = await historyService.getById(id);
      return data;
    }
  );
  const initialState: HistoryState = {
    historyList: [],
    historyDetail:{
      id: 0,
      deliverAddress: "",
      createDate:"",
      totalPrice:0,
      voucherId:0,
      orderStatus:"",
      note:""

    },
    historyCount:0
  };
  const slice = createSlice({
    name: "History",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getHistory.fulfilled, (state, action) => {
          state.historyList = action.payload.result;
        });
      builder.addCase(deleteHistory.fulfilled, (state, action) => {
          state.historyList = state.historyList.filter((History) => History.id !== action.payload);
        });  
        builder.addCase(createHistory.fulfilled, (state, action) => {
          state.historyList.push(action.payload);
        }); 
        builder.addCase(getByIdHistory.fulfilled, (state, action) => {
          state.historyDetail = action.payload.result.items;
        });
        builder.addCase(updateHistory.fulfilled, (state, action) => {
          state.historyList = state.historyList.map((History) =>
          History.id === action.payload.id ? action.payload : History
          );
        });
    },
  });
  export default slice.reducer;
  