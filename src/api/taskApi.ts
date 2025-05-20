import axios from 'axios';
import type { Task, TaskFormData } from '../types/task';

const API_BASE_URL = import.meta.env.BACKEND_API_BASE_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const fetchTasks = async (keyword: string = ''): Promise<Task[]> => {
    try {
        const response = await apiClient.get(`/tasks`, {
            params: { q: keyword },
        });
        return response.data;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
}

// タスクの詳細を取得
export const fetchTask = async (id: number): Promise<Task> => {
    try {
        const response = await apiClient.get(`/tasks/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
}

// タスクの新規作成
export const createTask = async (task: TaskFormData): Promise<Task> => {
    try {
        const response = await apiClient.post('/tasks', task);
        return response.data;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
}

// タスクの更新
export const updateTask = async (id: string, task: Partial<TaskFormData>): Promise<Task> => {
    try {
        const response = await apiClient.put(`/tasks/${id}`, task);
        return response.data;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
}

// タスクの削除
export const deleteTask = async (id: number): Promise<void> => {
    try {
        await apiClient.delete(`/tasks/${id}`);
    } catch (error) {
        throw new Error(handleApiError(error));
    }
}

function handleApiError(error: unknown): string {
    if(axios.isAxiosError(error)) {
        if (error.response) {
            return error.response.data.message || `サーバーエラー: ${error.response.status}`;
        } else if (error.request) {
            return 'サーバーからの応答がありません';
        }
    }
    return 'リクエストの送信中にエラーが発生しました';
}
