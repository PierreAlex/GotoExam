import { StocksDtoList } from '../types/stockInfo/StockInfo';
import { ComputedStockInfo, ComputedStocksList } from '../types/stockInfo/ComputedStockInfo';

export const computeStockListRecommendation = (stocksList: StocksDtoList): ComputedStocksList => {
    const computedStocksList = stocksList.stocksList.map((stockInfo): ComputedStockInfo => {
        if (stockInfo.stockPriceList.length == 0 || stockInfo.socialMediaCountList.length == 0) {
            return {
                averageDeviation: 0,
                averagePrice: 0,
                currentPrice: 0,
                diffPrice: 0,
                highestPrice: 0,
                iconUrl: '',
                isUnstable: false,
                lowestPrice: 0,
                recommendation: 0,
                socialMediaCountList: [],
                stockCode: 'Invalid',
                stockPriceList: [],
            };
        }
        const priceList = stockInfo.stockPriceList;
        const averagePrice = priceList.reduce((a, b) => a + b, 0) / priceList.length;
        const highestPrice = Math.max(...priceList);
        const lowestPrice = Math.min(...priceList);
        const averageDeviation = Math.sqrt(
            priceList.map((x) => Math.pow(x - averagePrice, 2)).reduce((a, b) => a + b) / priceList.length
        );
        const recommendation = ((priceList[priceList.length - 1] - averagePrice) / averageDeviation) * -1;

        const mediaCountList = stockInfo.socialMediaCountList;
        const averageMediaCount = mediaCountList.reduce((a, b) => a + b, 0) / priceList.length;
        const averageMediaCountDeviation = Math.sqrt(
            mediaCountList.map((x) => Math.pow(x - averageMediaCount, 2)).reduce((a, b) => a + b) /
                mediaCountList.length
        );
        const isUnstable = mediaCountList[mediaCountList.length - 1] > averageMediaCount + averageMediaCountDeviation;
        return {
            ...stockInfo,
            highestPrice: Math.round(highestPrice * 100) / 100,
            lowestPrice: Math.round(lowestPrice * 100) / 100,
            averageDeviation: Math.round(averageDeviation * 100) / 100,
            averagePrice: Math.round(averagePrice * 100) / 100,
            currentPrice: Math.round(priceList[priceList.length - 1] * 100) / 100,
            diffPrice: Math.round((priceList[priceList.length - 1] - priceList[0]) * 100) / 100,
            isUnstable,
            recommendation,
        };
    });
    return { stocksList: computedStocksList };
};
