import { useEffect, useState } from "react";
import type { Task } from "../types/task";
import { useNavigate } from "react-router-dom";
import { getAllTasks } from "../api/taskApi";
import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";


export default function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const navigate = useNavigate();

    const getTasks = async() => {
        try {
            const data = await getAllTasks();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }

    useEffect(() => {
        getTasks();
    }, []);



    return (
        <Container maxWidth="lg">
            <Box sx={{  my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Task List
                </Typography>
                {/* 検索 */}
                <Box sx={{ display: 'flex', mb: 2 }}>
                    <TextField
                        label="タスクを検索"
                        variant="outlined"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ ml: 2 }}
                    >
                        検索
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ ml: 2 }}
                        onClick={() => navigate('/tasks/create')}
                    >
                        新規作成
                    </Button>
                </Box>
                {/* 一覧 */}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Status</TableCell>
                                <TableCell>タイトル</TableCell>
                                <TableCell>内容</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasks.map((task) => (
                                <TableRow key={task.id} >
                                    <TableCell>
                                        {task.is_completed ? '完了' : '未完了'}
                                    </TableCell>
                                    <TableCell>{task.title}</TableCell>
                                    <TableCell>{task.description}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => {
                                                navigate(`/tasks/${task.id}`);
                                            }}
                                        >
                                            詳細
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
}
