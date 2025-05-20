export interface Task {
    id: number;
    title: string;
    description?: string;
    is_completed: boolean;
    created_at: string;
    updated_at: string;
}

export type TaskFormData = Omit<Task, 'id' | 'created_at' | 'updated_at'>;
