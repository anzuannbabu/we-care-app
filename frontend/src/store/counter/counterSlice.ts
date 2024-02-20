import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//define an interface
interface counterSate {
  value: number;
  loading: boolean;
  error: string | null;
}

//initialize the state
const initialState: counterSate = {
  value: 0,
  loading: false,
  error: null,
};

//create a slice, this will contain the list of reducer
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    //action
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        incrementAsync.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.value += action.payload;
          state.loading = false;
        }
      );
  },
});


//create async reducer
export const incrementAsync = createAsyncThunk(
  "counter/incrementAsync",
  async (amount: number) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return amount;
  }
);

//exporting actions here
export const { increment, decrement } = counterSlice.actions;

//export reducers from the counter slice
export default counterSlice.reducer;
