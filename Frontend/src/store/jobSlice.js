import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        getSingleJobDetail: null,
        searchJobByText: '',
        allAppliedJobs: [],
        searchQuery: ""
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload
        },
        setSingleJobDetail: (state, action) => {
            state.getSingleJobDetail = action.payload
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload
        },
        setAllAppliedJobs : (state, action) => {
            state.allAppliedJobs = action.payload
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload
        }
    }
});

export const {
            setAllJobs,
            setSingleJobDetail,
            setAllAdminJobs, 
            setSearchJobByText,
            setAllAppliedJobs,
            setSearchQuery

            
        } = jobSlice.actions
export default jobSlice.reducer;