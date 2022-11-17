import React, { useEffect, useState, useRef } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Box, InputAdornment, TextField } from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';

import { DateRange, DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { fetchStocksData } from '../../store/Stock/thunks';
import { useDispatch } from 'react-redux';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    box: {
        padding: '8px 0px 4px 0px',
        display: 'flex',
    },
    textField: {
        width: '108px',
        padding: '1px',
        margin: '0px 4px',
    },
    dateField: {
        width: '114px',
        padding: '1px',
        margin: '0px 4px',
    },
});

const StockForm: React.FC = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [stockCode, setStockCode] = useState('GO');
    const [timeRange, setTimeRange] = React.useState<DateRange<Dayjs>>([dayjs('2019-01-25'), dayjs('2019-01-31')]);
    useEffect(() => {
        dispatch(fetchStocksData(stockCode, timeRange));
    }, []);
    useEffect(() => {
        dispatch(fetchStocksData(stockCode, timeRange));
    }, [stockCode, timeRange]);

    return (
        <Box className={classes.box}>
            <TextField
                size="small"
                className={classes.textField}
                label="Stock code"
                value={stockCode}
                id="stockCodeInput"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <ShowChartIcon />
                        </InputAdornment>
                    ),
                }}
                onChange={(e) => setStockCode(e.target.value)}
            />
            <DateRangePicker
                value={timeRange}
                onChange={(e) => setTimeRange(e)}
                renderInput={(startProps, endProps) => {
                    return (
                        <React.Fragment>
                            <TextField className={classes.dateField} size="small" {...startProps} />
                            <Box> to </Box>
                            <TextField className={classes.dateField} size="small" {...endProps} />
                        </React.Fragment>
                    );
                }}
            />
        </Box>
    );
};

export default StockForm;
