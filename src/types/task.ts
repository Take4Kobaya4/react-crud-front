export interface Task {
    id: number;
    title: string;
    description?: string;
    is_completed: boolean;
}

export interface TaskFormData {
    title: string;
    description?: string;
    is_completed: boolean;
}
