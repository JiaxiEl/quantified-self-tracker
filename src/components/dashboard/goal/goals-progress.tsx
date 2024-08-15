import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

interface GoalsProgressProps {
    value: number;
    sx?: object;
}

export function GoalsProgress({ value, sx }: GoalsProgressProps): React.JSX.Element {
    return (
        <Card sx={sx}>
            <CardContent>
                <Typography variant="h6">Goals Progress</Typography>
                <LinearProgress variant="determinate" value={value} />
                <Typography sx={{ mt: 2 }} variant="body2">
                    {value}% of your goals have been achieved.
                </Typography>
            </CardContent>
        </Card>
    );
}
