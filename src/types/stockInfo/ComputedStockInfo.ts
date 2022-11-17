export interface ComputedStocksList {
    stocksList?: ComputedStockInfo[];
}

export interface ComputedStockInfo {
    iconUrl?: string;
    stockCode?: string;
    stockPriceList?: number[];
    socialMediaCountList?: number[];
    recommendation?: number;
    isUnstable?: boolean;
    highestPrice?: number;
    lowestPrice?: number;
    diffPrice?: number;
    averagePrice?: number;
    currentPrice?: number;
    averageDeviation?: number;
}
