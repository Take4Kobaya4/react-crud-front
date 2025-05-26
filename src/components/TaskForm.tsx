import { taskSchema, type TaskValidationSchema } from "../schema/ taskSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Checkbox, FormControlLabel, TextField } from "@mui/material";

type Props = {
    defaultValues?: TaskValidationSchema;
    onSubmit: (data: TaskValidationSchema) => void;
}

export default function TaskForm({defaultValues, onSubmit}: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TaskValidationSchema>({
        resolver: zodResolver(taskSchema),
        defaultValues: defaultValues ?? {
            title: '',
            description: '',
            is_completed: false
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection="column" gap={2} >
                <TextField
                    label="タイトル"
                    {...register('title')}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                />

                <TextField
                    label="内容"
                    multiline
                    rows={4}
                    {...register('description')}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                />

                <FormControlLabel 
                    control={<Checkbox {...register('is_completed')} />}
                    label="完了済み"
                />

                <Button variant="contained" type="submit" color="primary">
                    保存
                </Button>

            </Box>
        </form>
     );
}