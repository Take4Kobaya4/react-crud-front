
import './App.css'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
import TaskCreate from './components/TaskCreate';
import TaskEdit from './components/TaskEdit';


function App () {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#9c27b0',
      },
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path='/tasks' element={<TaskList/>} />
          <Route path='/tasks/:id' element={<TaskDetail/>} />
          <Route path='/tasks/create' element={<TaskCreate/>} />
          <Route path='/tasks/:id/edit' element={<TaskEdit/>} />
          <Route path='/' element={<Navigate to="/tasks" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;
