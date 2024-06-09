import { useContext } from 'react';
import { useTodosViewModel } from './view_models/TodoViewModel';
import { Header } from './views/layouts/todo/Header';
import { TodoTable } from './views/layouts/todo/TodoTable';
import { TodoServiceContext } from './contexts/TodoServicesContext';

function App() { 
	const todoServices = useContext(TodoServiceContext)
	const { state, handleAddTodo, handleUpdateTodo, handleDeleteTodo } = useTodosViewModel(todoServices);

	return (
		<>
		<section className='h-full flex flex-col justify-center md:max-w-xl container mx-auto relative'>
					<Header addTodoCallBack={handleAddTodo} />
					<TodoTable
						isLoading={state.loading}
						todoList={state.todos}
						onItemUpdate={handleUpdateTodo}
						onItemDelete={handleDeleteTodo}
					/>
				</section>
		</>
	);
}
export default App;
