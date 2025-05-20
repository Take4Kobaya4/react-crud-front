/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, type ReactNode } from "react";
import type { Task, TaskFormData } from "../types/task";
import { 
    fetchTask, 
    fetchTasks, 
    createTask as apiCreateTask, 
    updateTask as apiUpdateTask , 
    deleteTask as apiDeleteTask 
} from "../api/taskApi";



interface TaskContextType {
    tasks: Task[];
    searchTasks: (keyword: string) => Promise<void>;
    getTaskById: (id: string) => Promise<Task | undefined>;
    createTask: (task: TaskFormData) => Promise<Task>;
    updateTask: (id:string, task: Partial<TaskFormData>) => Promise<Task>;
    deleteTask: (id: number) => Promise<void>;
    loading: boolean;
    error: string | null;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 一覧
    const searchTasks = async (keyword: string) => {
        setLoading(true);
        setError(null);
        try {
            const task = await fetchTasks(keyword);
            setTasks(task);
        } catch (err) {
            setError(err instanceof Error ? err.message : '取得中にエラーが発生しました');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        searchTasks('');
    }, []);
    // 詳細
    const getTaskById = async (id: string): Promise<Task | undefined> => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchTask(Number(id));
            setTasks([data]);
        } catch (err) {
            setError(err instanceof Error ? err.message : '取得中にエラーが発生しました');
        } finally {
            setLoading(false);
        }
    }

    // 新規作成
    const createTask = async (task: TaskFormData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiCreateTask(task);
            setTasks((prevTasks) => [...prevTasks, data]);
        } catch (err) {
            setError(err instanceof Error ? err.message : '作成中にエラーが発生しました');
        } finally {
            setLoading(false);
        }
    }

    // 更新
    const updateTask = async (id:string, task: Partial<TaskFormData>) => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiUpdateTask(id, task);
            setTasks((prevTasks) => prevTasks.map(t => t.id === data.id ? data : t));
        } catch (err) {
            setError(err instanceof Error ? err.message : '更新中にエラーが発生しました');
        } finally {
            setLoading(false);
        }
    }

    // 削除
    const deleteTask = async (id:number) => {
        setLoading(true);
        setError(null);
        try {
            await apiDeleteTask(id);
            setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : '削除中にエラーが発生しました');
        } finally {
            setLoading(false);
        }
    }

    const value: TaskContextType = {
        tasks,
        searchTasks,
        getTaskById,
        createTask,
        updateTask,
        deleteTask,
        loading,
        error,
    }

    return(
        <TaskContext.Provider
            value={value}
        >
            {children}
        </TaskContext.Provider>
    );
}

