import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';
import { DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';
import { Dayjs } from 'dayjs';
import { ComputedStocksList } from '../../types/stockInfo/ComputedStockInfo';

// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

export const initialMapState: ComputedStocksList = {
    stocksList: [],
};

const slice = createSlice({
    name: 'Stock',
    initialState: initialMapState,
    reducers: {
        computedStockListChanged: (state: ComputedStocksList, action: PayloadAction<ComputedStocksList>) => {
            state.stocksList = action.payload.stocksList;
        },
    },
});

const { reducer } = slice;

export const { computedStockListChanged } = slice.actions;

export default reducer;
