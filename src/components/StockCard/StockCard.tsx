import React, { useState } from 'react';
import { Avatar, Box, Button, Card, CardContent, Divider, Typography } from '@mui/material';

import { ComputedStockInfo } from '../../types/stockInfo/ComputedStockInfo';
import { Line, YAxis, LineChart } from 'recharts';
import Money from '@mui/icons-material/AttachMoney';
import ShareIcon from '@mui/icons-material/Share';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    card: {
        margin: '8px',
        borderRadius: 15,
        border: 'lightgrey 1px solid',
        width: 444,
        textAlign: 'center',
    },
    buttonBox: {
        textAlign: 'right',
    },
    avatarBox: {
        display: 'flex',
        justifyContent: 'center',
        margin: '-12px 8px',
    },
    avatar: {
        width: 84,
        height: 84,
        margin: 'auto',
    },
    dataBox: {
        padding: '2px',
        flex: 'auto',
    },
    red: {
        color: 'red',
    },
    green: {
        color: 'green',
    },
});

interface Props {
    data: ComputedStockInfo;
}

const StockCard: React.FC<Props> = ({ data }: Props) => {
    const classes = useStyles();
    const [showStock, setShowStock] = useState(true);
    const shadowCSS =
        data.recommendation > 0
            ? '2px 3px 4px 3px rgb(37 128 23 / ' + data.recommendation * 0.4 + ')'
            : '2px 3px 4px 3px rgb(112 23 23 / ' + data.recommendation * -0.4 + ')';

    const getGraphData = () => {
        if (!showStock) {
            return data.socialMediaCountList.map((value) => {
                return {
                    uv: value,
                };
            });
        } else {
            return data.stockPriceList.map((value) => {
                return {
                    uv: value,
                    highSell: data.averagePrice + data.averageDeviation,
                    lowBuy: data.averagePrice - data.averageDeviation,
                };
            });
        }
    };

    return (
        <Card className={classes.card} elevation={3} sx={{ boxShadow: shadowCSS }}>
            <Box className={classes.buttonBox}>
                {showStock ? (
                    <Button size={'small'} onClick={() => setShowStock(!showStock)} title={'Show popularity'}>
                        <ShareIcon />
                        Show popularity
                    </Button>
                ) : (
                    <Button size={'small'} onClick={() => setShowStock(!showStock)} title={'Show price'}>
                        <Money />
                        Show price
                    </Button>
                )}
            </Box>
            <Box className={classes.avatarBox}>
                <CardContent>
                    <Avatar className={classes.avatar} src={data.iconUrl} />
                    <Typography variant="subtitle1">{data.stockCode}</Typography>
                    <Typography component="div" width={84} variant="caption">
                        {data.currentPrice + '$ '}
                        <span className={data.diffPrice > 0 ? classes.green : classes.red}>
                            {(data.diffPrice > 0 ? '↑' : '↓') + Math.abs(data.diffPrice)}
                        </span>
                    </Typography>
                </CardContent>
                <LineChart width={300} height={140} data={getGraphData()}>
                    <YAxis width={36} stroke="rgba(25,118,210,0.7)" />
                    <Line type="monotone" dataKey="uv" stroke="#1976d2" />
                    <Line type="linear" dot={false} dataKey="highSell" stroke="#991100" />
                    <Line type="linear" dot={false} dataKey="lowBuy" stroke="#009911" />
                </LineChart>
            </Box>
            <Divider light />
            <Box display={'flex'}>
                <Box className={classes.dataBox}>
                    <Typography variant="subtitle2">Low</Typography>
                    <Typography variant="caption">{data.lowestPrice}$</Typography>
                </Box>
                <Box className={classes.dataBox}>
                    <Typography variant="subtitle2">High</Typography>
                    <Typography variant="caption">{data.highestPrice}$</Typography>
                </Box>
                <Box className={classes.dataBox}>
                    <Typography variant="subtitle2">Average</Typography>
                    <Typography variant="caption">{data.averagePrice}$</Typography>
                </Box>
                <Box className={classes.dataBox}>
                    <Typography variant="subtitle2">Avg. deviation</Typography>
                    <Typography variant="caption">±{data.averageDeviation}</Typography>
                </Box>
                <Box className={classes.dataBox}>
                    <Typography variant="subtitle2">Social Media</Typography>
                    <Typography variant="caption">{data.isUnstable ? 'Viral' : 'Normal'}</Typography>
                </Box>
            </Box>
        </Card>
    );
};

export default StockCard;
