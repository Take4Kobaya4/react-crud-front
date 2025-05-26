import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Task } from "../types/task";
import { deleteTask, fetchTask } from "../api/taskApi";
import { Box, Button, Checkbox, CircularProgress, Container, Typography } from "@mui/material";


export default function TaskDetail() {
    const { id } = useParams<{ id: string}>();
    const navigate = useNavigate();
    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 詳細タスクの取得
        const getTaskById = async () => {
            // idがある場合は、以下の処理を実行
            if(id){
                try {
                    const response = await fetchTask(Number(id));
                    setTask(response);
                } catch (error) {
                    console.error("タスクの取得に失敗しました:", error);
                }
            }
            setLoading(false);
        };
        getTaskById();
    }, [id]);

    const handleDelete = async () => {
        if(window.confirm(`本当に削除しますか？`)) {
            await deleteTask(Number(id));
            navigate('/tasks');
        }
    }

    if(loading) return <CircularProgress />;
    if(!task) return <Typography>タスクが見つかりません</Typography>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                タスク詳細
            </Typography>

            <Box mb={2}>
                <Typography variant="h6">タイトル</Typography>
                <Typography>{task.title}</Typography>
            </Box>

            <Box mb={2}>
                <Typography variant="h6">内容</Typography>
                <Typography>{task.description}</Typography>
            </Box>

            <Box mb={2}>
                <Typography variant="h6">ステータス</Typography>
                <Checkbox checked={task.is_completed} disabled />
            </Box>

            <Box display="flex" gap={2}>
                <Button 
                variant="contained"
                color="secondary"
                onClick={() => navigate('/tasks')}>
                    一覧に戻る
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/tasks/${task.id}/edit`)}
                >
                    編集
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                >
                    削除
                </Button>
            </Box>
        </Container>
    );
}
