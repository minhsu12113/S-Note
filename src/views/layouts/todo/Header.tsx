import { useRef } from "react";

interface HeaderProps {
	addTodoCallBack: (content: string) => void;
}

export const Header = ({ addTodoCallBack }: HeaderProps) => {
	const inputTodo = useRef<HTMLInputElement>(null);
	return (
		<section>
			<p className='text-4xl antialiased md:subpixel-antialiased font-medium mb-7 text-gray-50 text-center'>S-Note</p>
			<section className='h-12 mx-4 rounded-lg drop-shadow-2xl flex'>
				<input  
					ref={inputTodo}
					type='text'
					className='block w-4/6 rounded-md border-none h-full  
						py-1.5 pl-7 pr-20 text-gray-900 ring-inset ring-gray-300 
					 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
					 focus:ring-indigo-600 sm:text-sm sm:leading-6'
					placeholder='Enter somethings...'
				/>

				<div role="button"
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