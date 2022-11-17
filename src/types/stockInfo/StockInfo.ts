import { DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';
import { Dayjs } from 'dayjs';

// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

export interface StocksDtoList {
    stocksList?: StockInfoDto[];
}

export interface StockInfoDto {
    iconUrl: string;
    stockCode: string;
    stockPriceList: number[];
    socialMediaCountList: number[];
}
