import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import reviewReducer from '../features/reviews/reviewSlice'
import pageReducer from '../features/pageSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    review: reviewReducer,
    page: pageReducer,

    

  },
});
