import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//define the interface
interface Appointment {
  _id: string;
  registeredDate: string;
  appointmentDate: string;
  timeSlot: string;
  couchName: string;
  couchId: string;
  coucheeId: string;
  coucheeName: string;
}
interface AppointmentSlice {
  data: Appointment[];
  loading: boolean;
}

//initialize the state
const initialState: AppointmentSlice = {
  data: [],
  loading: false,
};

//create slice
const appointmentSlice = createSlice({
  name: "coucheeAppointments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //will build our async reducer here
    builder
      .addCase(fetchCoucheeAppointmentsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCoucheeAppointmentsAsync.fulfilled,
        (state, action: PayloadAction<Appointment[]>) => {
          state.data = action.payload;
          state.loading = false;
        }
      );
  },
});

//create async reducer here
export const fetchCoucheeAppointmentsAsync = createAsyncThunk(
  "coucheeApppointments/fetchAllCoucheeApppointments",
  async (params: any) => {
    const posts = await axios.get("http://localhost:8008/api/v1/appointments", {
      headers: {
        Authorization: "bearer " + params?.token,
      },
    });
    //TODO: wee need to handle http failure here

    return posts.data;
  }
);

//exporting actions here
export const {} = appointmentSlice.actions;

//export reducers from the counter slice
export default appointmentSlice.reducer;
