import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import { computedStockListChanged } from './reducer';
import { DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';
import { Dayjs } from 'dayjs';
import { generateRandomData } from '../../utils/generateRandomData';
import { computeStockListRecommendation } from '../../utils/computeStockListRecommendation';

export const fetchStocksData =
    (stockCode: string, dateRange: DateRange<Dayjs>) => async (dispatch: StoreDispatch, getState: StoreGetState) => {
        try {
            // we would do the fetch here instead of the generator
            const stockList = generateRandomData(stockCode, dateRange[1].diff(dateRange[0], 'days'));

            dispatch(computedStockListChanged(computeStockListRecommendation(stockList)));
        } catch (err) {
            console.error(err);
        }
    };
