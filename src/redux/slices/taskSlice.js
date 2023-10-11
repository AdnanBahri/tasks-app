import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  categories: [],
  tasks: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const clearStore = createAsyncThunk("clear", async (_, thunkAPI) => {
  try {
    await AsyncStorage.removeItem("persist:tasks");
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories = [...state.categories, action.payload];
    },
    removeCategory: (state, action) => {
      const newCategories = state.categories.filter(
        (item) => item.toLowerCase() !== action.payload.toLowerCase()
      );
      const newTasks = state.tasks.filter(
        (task) =>
          task.category_name.toLowerCase() !== action.payload.toLowerCase()
      );
      state.categories = [...newCategories];
      state.tasks = [...newTasks];
    },
    updateCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    addTask: (state, action) => {
      state.tasks = [...state.tasks, action.payload];
    },
    removetask: (state, action) => {
      const newList = state.tasks.filter((task) => task !== action.payload);
      state.tasks = newList;
    },
    updateTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    removeAll: (state) => {
      state = initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(PURGE, (state) => {
      state.tasks = [];
      state.categories = [];
    });
  },
});

export const {
  addCategory,
  removeCategory,
  updateCategory,
  addTask,
  removetask,
  updateTask,
  removeAll,
} = taskSlice.actions;

const taskReducer = taskSlice.reducer;

export default taskReducer;
