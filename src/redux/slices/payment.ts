import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import billService from "../../services/bill/bill.service";
import { BillState } from "../../@types/cart";
import { PaymentState } from "../../@types/payment";

export const getPayment = createAsyncThunk(
    "get/getPayment",
    async (params: any) => {
      const { data } = await billService.getPayment(params);
      return data;
    }
  );
  const initialState: PaymentState = {
    paymentList: [],

  };
  const slice = createSlice({
    name: "Receipt",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPayment.fulfilled, (state, action) => {
            state.paymentList = action.payload;
          });
    },
  });
  export default slice.reducer;
  