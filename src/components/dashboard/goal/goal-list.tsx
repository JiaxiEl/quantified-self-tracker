import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

interface Goal {
    title: string;
    dueDate: string;
    completed: boolean;
}

interface GoalListProps {
    goals: Goal[];
    onComplete: (id: string) => void;
}

export function GoalList({ goals, onComplete }: GoalListProps): React.JSX.Element {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6">Your Goals</Typography>
                <List>
                    {goals.map((goal, index) => (
                        <ListItem key={index} secondaryAction={
                            !goal.completed && (
                                <Button variant="contained" color="primary" onClick={() => onComplete(goal.title)}>
                                    Mark as Completed
                                </Button>
                            )
                        }>
                            <ListItemText primary={goal.title} secondary={`Due: ${goal.dueDate}`} />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}
