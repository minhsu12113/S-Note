import { useEffect, useRef, useState } from 'react';
import { TodoItem, TodoItemProps } from './layout/components/todo/TodoItem';
import { addTodo, loadTodos } from './services/TodoServices';

function App() {
	const [todoItems, setTodoItems] = useState<TodoItemProps[]>();
	useEffect(() => {
		loadTodos().then((res) => {
			if (res) setTodoItems(res);
		});
	}, []);

	const handleAddTodoItem = (content: string) => {
		if (content) {
			addTodo({ completed: false, todo: content });
			loadTodos().then((res) => setTodoItems(res));
		}
	};

	return (
		<>
			<section className='h-full flex flex-col justify-center md:max-w-xl container mx-auto'>
				<Header addTodoCallBack={handleAddTodoItem} />
				<TodoTable todoList={todoItems}></TodoTable> 
			</section>
		</>
	);
}

interface TodoTableProps {
	todoList: TodoItemProps[] | undefined;
}
function TodoTable({ todoList: todoItems }: TodoTableProps) {
	return (
		<section className='h-2/4 bg-white m-4 rounded-lg drop-shadow-2xl overflow-auto'>
			{todoItems?.map((item, index) => (
				<TodoItem completed={item.completed} todo={item.todo} key={index} />
			))}
		</section>
	);
}

interface HeaderProps {
	addTodoCallBack: (content: string) => void;
}

function Header({ addTodoCallBack }: HeaderProps) {
	const inputTodo = useRef<HTMLInputElement>(null);
	return (
		<section className='header'>
			<p className='text-4xl antialiased md:subpixel-antialiased font-medium mb-7 text-gray-50 text-center'>Todo List</p>
			<section className='h-12 mx-4 mt-2 rounded-lg drop-shadow-2xl flex'>
				<input
					ref={inputTodo}
					type='text'
					className='block w-4/6 rounded-md border-none h-full  
						py-1.5 pl-7 pr-20 text-gray-900 ring-inset ring-gray-300 
					 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
					 focus:ring-indigo-600 sm:text-sm sm:leading-6'
					placeholder='Enter somethings...'
				/>

				<div
					onClick={() => {
						if (inputTodo.current) {
							addTodoCallBack(inputTodo.current.value);
							inputTodo.current.value = '';
						}
					}}
					className='w-2/6 transition-colors bg-white text-gray-600 rounded-lg drop-shadow-2xl ml-2.5 flex flex-col 
						justify-center hover:bg-regal-blue hover:text-white
						hover:cursor-pointer'>
					<p className='text-center  '>Add Task</p>
				</div>
			</section>
		</section>
	);
}
export default App;
