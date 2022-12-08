import Image from 'next/image';
import React, { useRef, useState } from 'react';
import TodoForm from '../components/TodoForm';

const Home = () => {
  const [allTodos, setAllTodos] = useState([]);
  const [status, setStatus] = useState(false);
  const [currentItem, setCurrentItem] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(false);
  const [updateItem, setUpdateItem] = useState(currentItem.todoItem)
  const [checked, setChecked] = useState(false)
  const [checkStatus, setCheckStatus] = useState(false)
  const ref = useRef(null);

  const editTodo = (item, i) => {
    setStatus(true)
    setCurrentItem(item.todoItem);
    setCurrentIndex(item.todoId);
  }
  const handleChange = e => {
    setCurrentItem(e.target.value);
  }
  const handleClick = () => {
    if (ref.current.checked) {
      setCheckStatus(true);
      console.log('✅ Checkbox is checked');
    } else {
      setCheckStatus(false);
      console.log('⛔️ Checkbox is NOT checked');
    }
  }
  const updateTodo = () => {
    setAllTodos(allTodos.map(each => each.todoId == currentIndex ? { ...each, todoItem: currentItem } : each));
    setStatus(false);
  }
  return (
    <div className='bg-slate-200 h-screen py-20'>
      <div className='max-w-xl mx-auto py-16 flex flex-col gap-4'>
        <h2 className='text-2xl w-full font-semibold text-gray-700'>Todo List</h2>
        <div className='px-2 md:px-0 flex flex-col gap-14 w-full'>
          <TodoForm setAllTodos={setAllTodos} />
          <div className='flex flex-col gap-5'>
            {allTodos.map((item, i) => {
              return (
                <div key={i} className='px-4 py-4 md:px-10 w-full mx-auto  bg-white rounded-md shadow-md flex justify-between'>
                  <label htmlFor="todoChecked" className='flex items-center gap-4'>
                    <input ref={ref} className='rounded-full w-5 h-5 outline-none border border-gray-200 transition-all ease-in duration-500' value={checked} onChange={handleClick} type="checkbox" id="todoChecked" name="todoChecked" />
                    {/* <p className='text-gray-500 font-semibold text-sm md:text-base'>{item.todoItem}</p> */}
                    {checkStatus ? <p className='text-gray-500 font-semibold text-sm md:text-base line-through'>{item.todoItem}</p> : <p className='text-gray-5 00 font-semibold text-sm md:text-base'>{item.todoItem}</p>}
                  </label>
                  <div className='flex gap-3 md:gap-5 justify-center h-6'>
                    <div className='h-5 w-5 relative object-cover mt-1 cursor-pointer transition-all ease-in duration-300' onClick={() => editTodo(item, i)}>
                      <Image src={'/edit.png'} layout="fill" alt="edit" objectFit='contain' />
                    </div>

                    {status && <div className='bg-black/40 w-full fixed top-0 left-0 h-screen z-30 py-10'>
                      <div className='flex flex-col gap-5 mx-auto bg-white max-w-xl px-8 py-5 rounded-md shadow-md'>
                        <input className='px-4 py-3 rounded-md w-full md:w-9/12 border outline-none text-gray-400 focus:outline-blue-500' type="text" placeholder='Add a new todo' value={currentItem} onChange={handleChange} />
                        <div className="flex justify-end gap-3">
                          <button className='bg-blue-700  px-3 text-center h-12 text-white rounded-md outline-none hover:bg-blue-600 transition-all ease-in duration-300' onClick={updateTodo}>Save Changes</button>
                          <button className='bg-red-700 px-5 text-center h-12 text-white rounded-md outline-none hover:bg-red-600 transition-all ease-in duration-300' onClick={() => setStatus(false)}>Cancel</button>
                        </div>
                      </div>
                    </div>}
                    <div className='h-7 w-7 relative object-cover cursor-pointer hover:bg-gray-400 hover:rounded-full hover:p-3 transition-all ease-in duration-300' onClick={() => {
                      let deleted = window.confirm('This todo will be deleted permanently');
                      if (deleted) {
                        setAllTodos(allTodos.filter((_, index) => index !== i));
                      }
                    }} >
                      <Image src={'/trash.png'} layout="fill" alt="delete" objectFit='contain' />
                    </div>
                  </div>

                </div>
              )
            })}
            {/* <div className='px-4 py-4 md:px-10 w-full mx-auto bg-white rounded-md shadow-md flex justify-between'>
              <div className='flex items-center gap-4'>
                <input className='rounded-full w-5 h-5 outline-none border border-gray-200 transition-all ease-in duration-500' type="checkbox" />
                <p className='text-gray-500 font-semibold text-sm md:text-base'>Creating Motherboard</p>
              </div>
              <div className='flex gap-3 md:gap-5 justify-center'>
                <div className='h-5 w-5 relative object-cover mt-1 cursor-pointer transition-all ease-in duration-300'>
                  <Image src={'/edit.png'} layout="fill" objectFit='contain' alt="edit" />
                </div>
                <div className='h-7 w-7 relative object-cover cursor-pointer hover:bg-gray-400 hover:rounded-full hover:p-3 transition-all ease-in duration-300'>
                  <Image src={'/trash.png'} layout="fill" objectFit='contain' alt='delete' />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div >
  )
}

export default Home