import React, { ReactNode } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

interface Props {
    title: string;
    form?: ReactNode;
}
const PageHeader: React.FC<Props> = ({ title, form }: Props) => {
    return (
        <AppBar color="inherit" position="fixed">
            <Toolbar sx={{ flexWrap: 'wrap' }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>
                {form}
            </Toolbar>
        </AppBar>
    );
};

export default PageHeader;
