import { createSlice } from "@reduxjs/toolkit";

const initailExpenseState={
    data: {},
    showPremium: localStorage.getItem("isPremium")===true,
    showDark: localStorage.getItem("darkTheme")==='true'
}

const expenseSlice=createSlice({
    name:'expense',
    initialState:initailExpenseState,
    reducers :{
        receivedData(state, action){
            state.data=action.payload
        },

        Premium(state){
            state.showPremium=true;
            localStorage.setItem('isPremium', true)
        },
        notPremium(state) {
            state.showPremium=false;
            localStorage.setItem('isPremium', false)
        },
        toggle(state) {
            state.showDark=!state.showDark;
            localStorage.setItem('darkTheme', state.showDark)
            window.location.reload();
        }

    }
})

export const expenseActions=expenseSlice.actions

export default expenseSlice.reducer;