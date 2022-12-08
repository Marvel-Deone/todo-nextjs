import React, { useState } from 'react';

const TodoForm = ({ setAllTodos }) => {
    let todoId = 0;
    const [todo, setTodo] = useState('');
    const handleChange = e => {
        setTodo(e.target.value);
    }
    const addTodo = () => {
        // console.log(todoId++);
        setAllTodos(e => ([...e, {
            todoId: Math.floor(Math.random() * 100000000),
            todoItem: todo
        }]))
        todoId++
        console.log(todoId);
    }
    return (
        <div className='flex flex-col w-full md:flex-row gap-5 items-center'>
            <input className='px-4 py-3 rounded-md w-full md:w-9/12 outline-none text-gray-400' type="text" placeholder='Add a new todo' value={todo} onChange={handleChange} />
            <button className='bg-blue-700 px-4 py-3 text-center md:w-3/12 text-white rounded-md outline-none hover:bg-blue-600 transition-all ease-in duration-300' onClick={addTodo}>Add New Todo</button>
        </div>
    )
}

export default TodoForm;    