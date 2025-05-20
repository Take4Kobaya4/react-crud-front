import { useContext } from "react"
import { TaskContext } from "./TaskContext"; // 修正: TaskContextのインポート方法を変更


export const useTaskContext = () => {
    const context = useContext(TaskContext); // 修正: useContextの引数をTaskContextに変更
    if (context === undefined) {
        throw new Error("useTaskContext must be used within a TaskProvider");
    }

    return context;
}
