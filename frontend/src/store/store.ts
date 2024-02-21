import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import postsReducer from "./posts/postsSlice";
import coucheeReducer from "./couches/couchesSlice";
import couchAppointmentsReducer from "./couches/couchesAppoointmentSlice";
import coucheeAppointmentsReducer from "./couchee/couchesAppoointmentSlice";

export const store = configureStore({
  reducer: {
    //TODO: add reducer here...
    counter: counterReducer,
    posts: postsReducer,
    couches: coucheeReducer,
    couchAppointments: couchAppointmentsReducer,
    coucheeAppointments: coucheeAppointmentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
