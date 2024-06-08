import { useState } from 'react';
import { Checkbox } from '@headlessui/react';
import { Todo } from '../../../models/Todo';

interface TodoItemProp extends Todo {
	onUpdateTask: (todo: Todo) => void;
	onDeleteTask: (todo: Todo) => void;
}

export function TodoItem({ todo: content, completed: status, id, onUpdateTask, onDeleteTask }: TodoItemProp) {
	const defaultStatusColorClass = 'w-2 bg-yellow-600 m-1 h-2 rounded-full transition-colors';
	const statusColorCompleteClass = 'w-2 bg-green-800 m-1 h-2 rounded-full transition-colors';
	const [statusItem, setStatusItem] = useState(status);

	const handleUpdateStatus = (s: boolean) => onUpdateTask({ todo: content, completed: s, id: id });
	const handleDelete = () => onDeleteTask({ todo: content, completed: status, id: id });

	return (
		<>
			<section className='p-3 text-lg flex justify-between transition-colors hover:bg-slate-300 items-center h-auto'>
				<section className='flex items-center'>
					<div style={{ minWidth: '8px' }} className={statusItem ? statusColorCompleteClass : defaultStatusColorClass}></div>
					<p className='p-1 ml-2 overflow-hidden max-w-xl'>{content}</p>
				</section>
				<section className='flex gap-4'>
					<Checkbox
						style={{ minWidth: '16px', minHeight: '16px' }}
						checked={statusItem}
						onChange={(e) => {
							setStatusItem(e);
							handleUpdateStatus(e);
						}}
						className='group transition-colors block size-4 rounded border border-gray-500 bg-white data-[checked]:bg-green-800'>
						<svg className='stroke-white opacity-0 group-data-[checked]:opacity-100 ' viewBox='0 0 14 14' fill='none'>
							<path d='M3 8L6 11L11 3.5' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' />
						</svg>
					</Checkbox>
					<button onClick={handleDelete}
						style={{ minWidth: '16px', minHeight: '16px', maxWidth: '16px', maxHeight: '16px' }}
						type='button'
						className='text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none
					 focus:ring-orange-300 font-normal rounded-lg p-0.5 text-center inline-flex items-center  
					  dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='2'
							stroke='currentColor'
							className='size-6'>
							<path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
						</svg>

						<span className='sr-only'>Icon description</span>
					</button>
				</section>
			</section>
			<div className='flex-grow border-t border-gray-300'></div>
		</>
	);
}
