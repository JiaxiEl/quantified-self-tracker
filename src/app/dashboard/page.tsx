import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';

import { config } from '@/config';
import { Sales } from '@/components/dashboard/overview/sales';
import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
import { Traffic } from '@/components/dashboard/overview/traffic';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
    return (
        <Grid container spacing={3}>
            <Grid lg={6} xs={12}>
                <TasksProgress sx={{ height: '100%' }} value={75.5} />
            </Grid>
            <Grid lg={6} xs={12}>
                <Traffic chartSeries={[63, 15, 22]} labels={['Desktop', 'Tablet', 'Phone']} sx={{ height: '100%' }} />
            </Grid>
            <Grid lg={12} xs={12}>
                <Sales
                    chartSeries={[
                        { name: 'This year', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] },
                        { name: 'Last year', data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13] },
                    ]}
                    sx={{ height: '100%' }}
                />
            </Grid>
        </Grid>
    );
}
