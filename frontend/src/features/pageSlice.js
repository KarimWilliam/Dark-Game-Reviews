import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 currentPage:1
  }



  export const pageSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        getpage: (state) =>{
            return state.currentPage;
        },
        setPage: (state,action)=>{
            state.currentPage=action.payload;
        }
        }

})
export const { reset,getpage,setPage} = pageSlice.actions
export default pageSlice.reducer