import { StocksDtoList } from '../../src/types/stockInfo/StockInfo';
import { computeStockListRecommendation } from '../../src/utils/computeStockListRecommendation';

test('given last stock above average deviation then recommendation is below -1', () => {
    const stocksDtoList: StocksDtoList = {
        stocksList: [
            {
                stockPriceList: [30, 50, 70],
                stockCode: 'as',
                socialMediaCountList: [30],
                iconUrl: '',
            },
        ],
    };
    const stocksList = computeStockListRecommendation(stocksDtoList);
    expect(stocksList.stocksList[0].recommendation).toBeLessThan(-1);
});

test('given last stock below average deviation then recommendation is below 1', () => {
    const stocksDtoList: StocksDtoList = {
        stocksList: [
            {
                stockPriceList: [70, 50, 30],
                stockCode: 'as',
                socialMediaCountList: [30],
                iconUrl: '',
            },
        ],
    };
    const stocksList = computeStockListRecommendation(stocksDtoList);
    expect(stocksList.stocksList[0].recommendation).toBeGreaterThan(1);
});

test('given last stock equal average value then recommendation is 0', () => {
    const stocksDtoList: StocksDtoList = {
        stocksList: [
            {
                stockPriceList: [70, 30, 50],
                stockCode: 'as',
                socialMediaCountList: [30],
                iconUrl: '',
            },
        ],
    };
    const stocksList = computeStockListRecommendation(stocksDtoList);
    expect(stocksList.stocksList[0].recommendation).toBe(-0); //lol
});

test('given last media count above average deviation then recommendation isUnstable', () => {
    const stocksDtoList: StocksDtoList = {
        stocksList: [
            {
                stockPriceList: [70, 30, 50],
                stockCode: 'as',
                socialMediaCountList: [30, 20, 90],
                iconUrl: '',
            },
        ],
    };
    const stocksList = computeStockListRecommendation(stocksDtoList);
    expect(stocksList.stocksList[0].isUnstable).toEqual(true);
});

test('given last media count below average deviation then recommendation is stable', () => {
    const stocksDtoList: StocksDtoList = {
        stocksList: [
            {
                stockPriceList: [70, 30, 50],
                stockCode: 'as',
                socialMediaCountList: [30, 20, 20],
                iconUrl: '',
            },
        ],
    };
    const stocksList = computeStockListRecommendation(stocksDtoList);
    expect(stocksList.stocksList[0].isUnstable).toEqual(false);
});

test('assert all value', () => {
    const stocksDtoList: StocksDtoList = {
        stocksList: [
            {
                stockPriceList: [70, 30, 50],
                stockCode: 'as',
                socialMediaCountList: [30, 20, 20],
                iconUrl: '',
            },
        ],
    };
    const stocksList = computeStockListRecommendation(stocksDtoList);
    expect(stocksList.stocksList[0]).toEqual({
        averageDeviation: 16.33,
        averagePrice: 50,
        currentPrice: 50,
        diffPrice: -20,
        highestPrice: 70,
        iconUrl: '',
        isUnstable: false,
        lowestPrice: 30,
        recommendation: -0,
        socialMediaCountList: [30, 20, 20],
        stockCode: 'as',
        stockPriceList: [70, 30, 50],
    });
});

const INVALID_STOCK = {
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
test('when stockPrice list is empty survive and return Invalid', () => {
    const stocksDtoList: StocksDtoList = {
        stocksList: [
            {
                stockPriceList: [],
                stockCode: 'as',
                socialMediaCountList: [30, 20, 20],
                iconUrl: '',
            },
        ],
    };
    const stocksList = computeStockListRecommendation(stocksDtoList);
    expect(stocksList.stocksList[0]).toEqual(INVALID_STOCK);
});

test('when media count list is empty survive and return Invalid', () => {
    const stocksDtoList: StocksDtoList = {
        stocksList: [
            {
                stockPriceList: [30],
                stockCode: 'as',
                socialMediaCountList: [],
                iconUrl: '',
            },
        ],
    };
    const stocksList = computeStockListRecommendation(stocksDtoList);
    expect(stocksList.stocksList[0]).toEqual(INVALID_STOCK);
});
