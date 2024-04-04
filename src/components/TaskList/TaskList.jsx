import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from '../../components/Task/Task';
import { toast } from 'react-toastify';
import Footer from '../Footer/Footer';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('https://lista-de-tarefas-backend.onrender.com/tasklist', { withCredentials: true });
                setTasks(response.data);
            } catch (error) {
                toast.error('Erro ao buscar tarefas', {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        };

        fetchTasks();
    }, []);

    const handleInputChange = event => {
        setInputValue(event.target.value);
    };

    const handleAddTask = async () => {
        if (inputValue.trim() === '') {
            toast.error('Digite uma tarefa', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
        try {
            const response = await axios.post('https://lista-de-tarefas-backend.onrender.com/addtask', {
                title: inputValue,
            }, { withCredentials: true }); 

            const newTask = response.data;
            setTasks([...tasks, newTask]);
            toast.success('Tarefa adicionada', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setInputValue('');
        } catch (error) {
            toast.error('Erro ao adicionar tarefa', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    const handleDeleteTask = async taskId => { 
        try {
            await axios.delete(`https://lista-de-tarefas-backend.onrender.com/deletetask/${taskId}`, { withCredentials: true });
            const newTasks = tasks.filter(task => task.id !== taskId); 
            setTasks(newTasks);
            toast.success('Tarefa Excluida', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error) {
            toast.error('Erro ao excluir tarefa', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };
    

    return (
        <>
        <main className="main_container">
            <div className='task_container'>
                <h2>Lista de Tarefas</h2>
                <div className='input_add_task'>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Digite uma nova tarefa"
                    />
                </div>
                <button className='btn_add' onClick={handleAddTask}>Adicionar</button>
                <div className='tasks'>
                    {tasks.map(task => (
                        <Task className='task_map'
                            key={task.id} 
                            task={task}
                            onDelete={() => handleDeleteTask(task.id)} 
                        />
                    ))}
                </div>
            </div>
        </main>
        <Footer/>
        </>
    );
};

export default TaskList;
