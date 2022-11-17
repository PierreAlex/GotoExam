import React from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import { StockList } from '../../components/StockList';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import { StockForm } from '../../components/StockForm';

const HomePage = () => {
    return (
        <ErrorBoundary>
            <PageHeader title="Stock market recommender" form={<StockForm />} />
            <StockList />
        </ErrorBoundary>
    );
};

export default HomePage;
