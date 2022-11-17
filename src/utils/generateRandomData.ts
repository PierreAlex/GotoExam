import { StockInfoDto, StocksDtoList } from '../types/stockInfo/StockInfo';
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const generateRandomData = (stockCode: string, range: number): StocksDtoList => {
    const stocksList = Array.from({ length: 40 }, (): StockInfoDto => {
        return {
            iconUrl: 'public/Logo' + Math.floor(Math.random() * 24) + '.png',
            stockCode:
                alphabet[Math.floor(Math.random() * alphabet.length)] +
                stockCode +
                alphabet[Math.floor(Math.random() * alphabet.length)],
            stockPriceList: Array.from({ length: range + 1 }).map(() => Math.random() * 100),
            socialMediaCountList: Array.from({ length: range + 1 }).map(() => Math.random() * 1000),
        };
    });
    return { stocksList: stocksList };
};
