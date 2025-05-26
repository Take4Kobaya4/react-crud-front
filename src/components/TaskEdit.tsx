import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { TaskFormData } from "../types/task";
import { fetchTask, updateTask } from "../api/taskApi";
import { CircularProgress, Container, Typography } from "@mui/material";
import TaskForm from "./TaskForm";
import type { Task } from "../types/task";


export default function TaskEdit() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTaskById = async () => {
            if(id) {
                const data = await fetchTask(Number(id));
                setTask(data);
            }
            setLoading(false);
        };
        getTaskById();
    }, [id]);

    const handleUpdate = async (data: TaskFormData) => {
        if(id){
            await updateTask(Number(id), data);
            // 一覧画面へ遷移
            navigate(`/tasks/`);
        }
    }

    if(loading) return <CircularProgress />;
    if(!task) return <Typography>タスクが見つかりません</Typography>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                タスクの編集
            </Typography>

            <TaskForm
                defaultValues={{
                    title: task.title,
                    description: task.description,
                    is_completed: task.is_completed
                }}
                onSubmit={(data) => handleUpdate(data as TaskFormData)}
            />
        </Container>
    );
}
