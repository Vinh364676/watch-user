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
  
  export const updateHistory = createAsyncThunk(
    "update/updateHistory",
    async (data: any) => {
      try {
        if (!data || !data.id) {
          console.error('Invalid data object:', data);
          throw new Error('Invalid data object');
        }
  
        console.log('Updating history with id:', data.id);
  
        // Assuming you have a service function for updating history
        const { data: updatedHistory } = await historyService.put(data.id, data);
  
        console.log('Updated history:', updatedHistory);
  
        return updatedHistory;
      } catch (error) {
        console.error('Error updating history:', error);
        throw error; // Rethrow the error to be caught in the component
      }
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
      note:"",

    },
    historyCount:0
  };
  const slice = createSlice({
    name: "History",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getHistory.fulfilled, (state, action) => {
          state.historyList = action.payload.result.items;
        });
        builder.addCase(updateHistory.fulfilled, (state, action) => {
          state.historyList = state.historyList.map((History) =>
          History.id === action.payload.id ? action.payload : History
          );
        });
    },
  });
  export default slice.reducer;
  