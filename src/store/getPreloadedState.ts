import { PartialRootState } from './configureStore';

import { initialMapState } from './Stock/reducer';
import { ComputedStocksList } from '../types/stockInfo/ComputedStockInfo';

const getPreloadedMapState = (): ComputedStocksList => {
    return {
        ...initialMapState,
    };
};

const getPreloadedState = (): PartialRootState => {
    return {
        Stock: getPreloadedMapState(),
    };
};

export default getPreloadedState;
