import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';
import { config } from '@/config';
import { GoalsProgress } from '@/components/dashboard/goal/goals-progress';  // Corrected path
import { UpcomingMilestones } from '@/components/dashboard/goal/upcoming-milestones';  // Corrected path

export const metadata = { title: `Goals | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
    return (
        <Grid container spacing={3}>
            <Grid lg={6} xs={12}>
                <GoalsProgress sx={{ height: '100%' }} value={75.5} />
            </Grid>
            <Grid lg={6} xs={12}>
                <UpcomingMilestones sx={{ height: '100%' }} milestones={[
                    { title: 'Complete React Course', dueDate: '2024-08-20' },
                    { title: 'Launch New Feature', dueDate: '2024-09-01' },
                ]} />
            </Grid>
        </Grid>
    );
}
