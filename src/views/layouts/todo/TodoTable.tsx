import { Guid } from 'guid-typescript';
import { Todo } from '../../../models/Todo';
import { EmptyData } from '../../components/EmptyData';
import { TodoItem } from './TodoItem';
import { SkeletonLoading } from '../../components/SkeletonLoading';

interface TodoTableProps {
	todoList: Todo[] | undefined;
	isLoading: boolean;
	onItemUpdate: (item: Todo) => void;
	onItemDelete: (item: Todo) => void;
}

export const TodoTable = ({ todoList: todoItems, isLoading, onItemUpdate, onItemDelete }: TodoTableProps) => {
	return (
		<>
			{isLoading ? (
				<SkeletonLoading />
			) : (
				<section className=' bg-white m-4 rounded-lg drop-shadow-2xl overflow-auto h-2/4'>
					{!(todoItems === undefined || todoItems.length == 0) ? (
						todoItems.map((item) => (
							<TodoItem
								completed={item.completed}
								todo={item.todo}
								id={item.id ? item.id : Guid.create().toString()}
								key={item.id ? item.id : Guid.create().toString()}
								onUpdateTask={onItemUpdate}
								onDeleteTask={onItemDelete}
							/>
						))
					) : (
						<EmptyData></EmptyData>
					)}
				</section>
			)}
		</>
	);
};
