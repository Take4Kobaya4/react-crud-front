import './App.css'
import { Route, Router, Routes } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';

function App() {
  

  return (
    <Router>
      <TaskProvider>
        <Routes>
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/create" element={<TaskForm />} />
          <Route path="/tasks/${id}/edit" element={<TaskForm />} />
        </Routes>
      </TaskProvider>
    </Router>
  )
}

export default App
