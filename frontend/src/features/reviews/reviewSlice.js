import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reviewService from "./reviewService";

//the amazing sorting algo
function dynamicSort(property, order) {
  // property is what value to sort by name,id ect
  //order  is asc or dec
  var sortOrder = 1;

  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    if (order) {
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    }
    var result =
      b[property] < a[property] ? -1 : b[property] > a[property] ? 1 : 0;
    return result * sortOrder;
  };
}

const initialState = {
  reviews: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new review
export const createReview = createAsyncThunk(
  "review/create",
  async (reviewData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await reviewService.createReview(reviewData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get reviews
export const getReviews = createAsyncThunk(
  "reviews/getAll",
  async (reviewData, thunkAPI) => {
    try {
      return await reviewService.getReviews(reviewData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete review
export const deleteReview = createAsyncThunk(
  "reviews/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await reviewService.deleteReview(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    sortReviews: (state, action) => {
      // 0 is what value to sort by name,id ect
      //1 is asc or dec
      state.reviews = state.reviews.sort(
        dynamicSort(action.payload[0], action.payload[1])
      ); //sort review by desired sort
    },
    bringToTop: (state, action) => {
      state.reviews.forEach(function (item, i) {
        if (item._id === action.payload) {
          state.reviews.splice(i, 1);
          state.reviews.unshift(item);
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reviews.push(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // console.log(action.payload)
        state.reviews = action.payload;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reviews = state.reviews.filter(
          (review) => review._id !== action.payload.id
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { reset, sortReviews, bringToTop } = reviewSlice.actions;
export default reviewSlice.reducer;
