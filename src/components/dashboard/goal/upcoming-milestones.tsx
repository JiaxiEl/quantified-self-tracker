import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

interface Milestone {
    title: string;
    dueDate: string;
}

interface UpcomingMilestonesProps {
    milestones: Milestone[];
    sx?: object;
}

export function UpcomingMilestones({ milestones, sx }: UpcomingMilestonesProps): React.JSX.Element {
    return (
        <Card sx={sx}>
            <CardContent>
                <Typography variant="h6">Upcoming Milestones</Typography>
                <List>
                    {milestones.map((milestone, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={milestone.title} secondary={`Due: ${milestone.dueDate}`} />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}
