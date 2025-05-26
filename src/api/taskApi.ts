import axios from 'axios';
import { type Task, type TaskFormData } from '../types/task';

const API_BASE_URL = import.meta.env.BACKEND_API_BASE_URL || 'http://localhost/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

// タスク一覧の取得
export const getAllTasks = async(): Promise<Task[]> => {
    const response = await apiClient.get<Task[]>(`/tasks`);
    return response.data;
}

// タスク詳細の取得
export const fetchTask = async(id:number): Promise<Task> => {
    const response = await apiClient.get<Task>(`/tasks/${id}/`);
    return response.data;
}

// タスクの新規作成
export const createTask = async(task: TaskFormData): Promise<Task> => {
    const response = await apiClient.post<Task>(`/tasks/`, task);
    return response.data;
}

// タスクの更新
export const updateTask = async(id: number, task: TaskFormData): Promise<Task> => {
    const response = await apiClient.put<Task>(`/tasks/${id}`, task);
    return response.data;
}

// タスクの削除
export const deleteTask = async(id:number): Promise<void> => {
    await apiClient.delete(`/tasks/${id}/`);
}
