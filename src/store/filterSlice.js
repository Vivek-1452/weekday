import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
    name: 'filters',
    initialState: [],
    reducers: {
    setFilters: (state, action) => {
        const filter = {
            name: action.payload.name,
            value: action.payload.value,
        };

        console.log({filter})

        return [...state, filter];
        }
    },
})

export const { setFilters } = filterSlice.actions;

export default filterSlice.reducer;