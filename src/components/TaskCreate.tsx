import { useNavigate } from "react-router-dom";
import { createTask } from "../api/taskApi";
import type { TaskFormData } from "../types/task";
import { Container, Typography } from "@mui/material";
import TaskForm from "./TaskForm";


export default function TaskCreate() {
    const navigate = useNavigate();

    const handleCreate = async(data: TaskFormData) => {
        await createTask(data);
        // 一覧画面へ遷移
        navigate('/tasks');
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                タスクの新規作成
            </Typography>
            <TaskForm onSubmit={(data) => handleCreate(data as TaskFormData)}/>
        </Container>
    );
}
