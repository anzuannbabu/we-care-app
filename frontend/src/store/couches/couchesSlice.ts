import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//define the interface
interface Couch {
  _id: string;
  Name: string;
  Password: string;
  Email: string;
  Birthday: string;
  Gender: string;
  Mobile: number;
  PinCode: string;
  City: string;
  State: string;
  Country: string;
  UserType: 1 | 0;
  Specialty: string;
}
interface CouchSlice {
  data: Couch[];
  loading: boolean;
}

//initialize the state
const initialState: CouchSlice = {
  data: [],
  loading: false,
};

//create slice
const couchSlice = createSlice({
  name: "couches",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //will build our async reducer here
    builder
      .addCase(fetchCouchesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCouchesAsync.fulfilled,
        (state, action: PayloadAction<Couch[]>) => {
          state.data = action.payload;
          state.loading = false;
        
        }
      );
  },
});

//create async reducer here
export const fetchCouchesAsync = createAsyncThunk(
  "couches/fetchAllCouches",
  async (params: any) => {
    const posts = await axios.get("http://localhost:8008/api/v1/couches");

    return posts.data;
  }
);

//exporting actions here
export const {} = couchSlice.actions;

//export reducers from the counter slice
export default couchSlice.reducer;
