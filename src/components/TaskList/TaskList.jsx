import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from '../../components/Task/Task';
import { toast } from 'react-toastify';
import Footer from '../Footer/Footer';
import Cookies from 'js-cookie';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('https://lista-de-tarefas-backend.onrender.com/tasklist');
                setTasks(response.data);
            } catch (error) {
                handleError(error);
            }
        };

        fetchTasks();
    }, []);

    const handleInputChange = event => {
        setInputValue(event.target.value);
    };

    const handleAddTask = async () => {
        if (inputValue.trim() === '') {
            toast.error('Digite uma tarefa');
            return;
        }
        try {
            const response = await axios.post('https://lista-de-tarefas-backend.onrender.com/addtask', {
                title: inputValue,
            });
            handleSuccess(response, 'Tarefa adicionada');
            setInputValue('');
        } catch (error) {
            handleError(error, 'Erro ao adicionar tarefa');
        }
    };

    const handleDeleteTask = async taskId => {
        try {
            await axios.delete(`https://lista-de-tarefas-backend.onrender.com/deletetask/${taskId}`);
            const newTasks = tasks.filter(task => task.id !== taskId);
            setTasks(newTasks);
            toast.success('Tarefa Excluída');
        } catch (error) {
            handleError(error, 'Erro ao excluir tarefa');
        }
    };

    const handleSuccess = (response, message) => {
        setTasks([...tasks, response.data]);
        toast.success(message);
    };

    const handleError = (error, message) => {
        if (error.response) {
            console.error(error.response.data);
            toast.error(message);
        } else if (error.request) {
            console.error(error.request);
            toast.error('Erro de requisição');
        } else {
            console.error('Error', error.message);
            toast.error('Erro desconhecido');
        }
    };

    axios.interceptors.request.use(config => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

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
            <Footer />
        </>
    );
};

export default TaskList;
