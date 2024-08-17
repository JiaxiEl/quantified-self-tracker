export interface Task {
    _id: string;
    goal: string; // This is the ID of the related goal
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
}
