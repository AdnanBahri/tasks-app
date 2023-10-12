import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import { shallowEqual } from "../../utils/util";
import { useDispatch } from "react-redux";

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
      // Todo: Add update to Category Cards
      // state.categories.push(action.payload);
    },
    addTask: (state, action) => {
      state.tasks = [...state.tasks, action.payload];
    },
    removetask: (state, action) => {
      const newList = state.tasks.filter(
        (task) => !shallowEqual(task, action.payload)
      );
      state.tasks = [...newList];
    },
    updateTask: (state, action) => {
      const { oldTask, newTask } = action.payload;
      const list = state.tasks.filter((task) => !shallowEqual(task, oldTask));
      state.tasks = [...list, newTask];
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
