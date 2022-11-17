import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectComputedStocksList } from '../../store/Stock/selectors';
import { StockCard } from '../StockCard';
import { Box } from '@mui/material';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    box: { display: 'flex', margin: '68px 0px', flexWrap: 'wrap', justifyContent: 'space-around' },
});
const StockList: React.FC = () => {
    const classes = useStyles();
    const data = useSelector(selectComputedStocksList);
    return (
        <Box className={classes.box}>
            {data.map((value, index) => {
                return <StockCard key={'stockCard' + index} data={value} />;
            })}
        </Box>
    );
};

export default StockList;
