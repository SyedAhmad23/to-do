import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Todo {
  id: string;
  title: string;
  status: boolean;
}

interface UserDetailState {
  allTodos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: UserDetailState = {
  allTodos: [],
  loading: false,
  error: null,
};

export const createTodo = createAsyncThunk<Todo, Todo>(
  "createTodo",
  async (data) => {
    const response = await axios.post<Todo>(
      "https://654aa2ac1f197d51e4927cb4.mockapi.io/crud",
      data
    );
    return response.data;
  }
);

export const showTodo = createAsyncThunk<Todo[]>("showTodo", async () => {
  const response = await axios.get<Todo[]>(
    "https://654aa2ac1f197d51e4927cb4.mockapi.io/crud"
  );
  return response.data;
});

export const updateTodo = createAsyncThunk<Todo, Todo>(
  "updateTodo",
  async (data) => {
    const response = await axios.put<Todo>(
      `https://654aa2ac1f197d51e4927cb4.mockapi.io/crud/${data.id}`,
      data
    );
    return response.data;
  }
);

export const deleteTodo = createAsyncThunk<string, string>(
  "deleteTodo",
  async (id) => {
    await axios.delete(
      `https://654aa2ac1f197d51e4927cb4.mockapi.io/crud/${id}`
    );
    return id;
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.allTodos.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as { message: string }).message
          : "An error occurred";
      })
      .addCase(showTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(showTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.allTodos = action.payload;
      })
      .addCase(showTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as { message: string }).message
          : "An error occurred";
      })

      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.allTodos = state.allTodos.filter((ele) => ele.id !== id);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as { message: string }).message
          : "An error occurred";
      })
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.allTodos = state.allTodos.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        );
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as { message: string }).message
          : "An error occurred";
      });
  },
});

export default todoSlice.reducer;
