import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: 'company',
    initialState: {
        singleCompany: null,
        companies: [],
        searchInputText: ""
    },
    reducers : {
        // Actions

        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload
        },
        setCompanies: (state, action) => {
            state.companies = action.payload
        },
        setSearchInputText: (state, action) => {
            state.searchInputText = action.payload
        }
    }
});
export const {setSingleCompany, setCompanies, setSearchInputText} = companySlice.actions;
export default companySlice.reducer