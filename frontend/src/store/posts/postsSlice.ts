import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//define the interface
interface Post {
  id: number;
  title: string;
  body: string;
}
interface PostSlice {
  data: Post[];
  loading: boolean;
}

//initialize the state
const initialState: PostSlice = {
  data: [],
  loading: false,
};

//create slice
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //will build our async reducer here
    builder
      .addCase(fetchPostsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchPostsAsync.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.data = action.payload;
          state.loading = false;
        }
      );
  },
});

//create async reducer here
export const fetchPostsAsync = createAsyncThunk(
  "posts/fetchAllPosts",
  async (params: any) => {
    const posts = await axios.get("https://jsonplaceholder.typicode.com/posts");

    return posts.data;
  }
);

//exporting actions here
export const {} = postSlice.actions;

//export reducers from the counter slice
export default postSlice.reducer;
