import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectComputedStocksList = createSelector(
    (state: RootState) => state.Stock.stocksList,
    (stocksList) => stocksList
);
