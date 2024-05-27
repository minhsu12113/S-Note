import { useEffect, useRef, useState } from 'react';
import { TodoItem, TodoItemProps } from './layout/components/todo/TodoItem';
import { addTodo, loadTodos } from './services/TodoServices';

function App() {
	const [todoItems, setTodoItems] = useState<TodoItemProps[]>();
	const [isShowWaitingUI, setIsShowWaitingUI] = useState(true);

	useEffect(() => {
		setIsShowWaitingUI(true);
		loadTodos()
			.then((res) => {
				if (res) {
					setTodoItems(res);
					setTimeout(() => setIsShowWaitingUI(false), 200);
				}
			})
			.catch((e) => {
				setTimeout(() => setIsShowWaitingUI(false), 200);
				setTodoItems(e);
			});
	}, []);

	const handleAddTodoItem = (content: string) => {
		if (content && !isShowWaitingUI) {
			addTodo({ completed: false, todo: content });
			loadTodos().then((res) => setTodoItems(res));
		}
	};

	return (
		<>
			<section className='h-full flex flex-col justify-center md:max-w-xl container mx-auto'>
				<Header addTodoCallBack={handleAddTodoItem} />
				{isShowWaitingUI ? <LoadingSkeleton /> : <TodoTable todoList={todoItems} />}
			</section>
		</>
	);
}

interface HeaderProps {
	addTodoCallBack: (content: string) => void;
}

function Header({ addTodoCallBack }: HeaderProps) {
	const inputTodo = useRef<HTMLInputElement>(null);
	return (
		<section className='header'>
			<p className='text-4xl antialiased md:subpixel-antialiased font-medium mb-7 text-gray-50 text-center'>S-Note</p>
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

interface TodoTableProps {
	todoList: TodoItemProps[] | undefined;
}

function TodoTable({ todoList: todoItems }: TodoTableProps) {
	return (
		<>
			{todoItems ? (
				<section className='h-2/4 bg-white m-4 rounded-lg drop-shadow-2xl overflow-auto h-2/4'>
					{todoItems?.map((item, index) => (
						<TodoItem completed={item.completed} todo={item.todo} key={index} />
					))}
				</section>
			) : (
				<EmptyData></EmptyData>
			)}
		</>
	);
}

function EmptyData() {
	return (
		<section className='m-4 md:max-w-xl container mx-auto w-full flex flex-col items-center flex-wrap'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				stroke='currentColor'
				className='size-32 fill-white stroke-slate-600'>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z'
				/>
			</svg>
			<p className='text-white'>Empty Data</p>
		</section>
	);
}

function LoadingSkeleton() {
	return (
		<>
			<div role='status' className='max-w-sm animate-pulse m-4 h-2/4'>
				<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>
				<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5'></div>
				<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5'></div>
				<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5'></div>
				<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5'></div>
				<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]'></div>
				<span className='sr-only'>Loading...</span>
			</div>
		</>
	);
}
export default App;