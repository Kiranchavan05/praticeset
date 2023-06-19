import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from './Authentication'
import expenseSlice from './Expenses'

const store=configureStore({
    reducer:{authentication:AuthSlice,
     expense:expenseSlice}

})

export default store;