import { useTodosViewModel } from './view_models/TodoViewModel';
import { Header } from './views/layouts/todo/Header';
import { TodoTable } from './views/layouts/todo/TodoTable';

function App() {
	const { state, handleAddTodo, handleUpdateTodo, handleDeleteTodo } = useTodosViewModel();
	const handleAddTodoItem = (content: string) => {
		if (content && !state.loading) handleAddTodo(content);
	};

	return (
		<>
			<section className='h-full flex flex-col justify-center md:max-w-xl container mx-auto'>
				<Header addTodoCallBack={handleAddTodoItem} />
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
