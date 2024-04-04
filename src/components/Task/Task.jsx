import React from 'react';

const Task = ({ task, onDelete }) => {
    return (
        <div className='tasks_task_container'>
            <span className='task_span'>{task.title}</span>
            <button className='btn_del' onClick={onDelete}>Excluir</button>
        </div>
    );
};

export default Task;
