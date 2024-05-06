import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
    name: 'filters',
    initialState: {},
    reducers: {
    setFilters: (state, action) => {;
        const value = action.payload.value

        return {...state, [action.payload.name]: value};
        }
    },
})

export const { setFilters } = filterSlice.actions;

export default filterSlice.reducer;