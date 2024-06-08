import { useState } from 'react';
import { Checkbox } from '@headlessui/react'; 
import { Todo } from '../../../models/Todo';


interface TodoItemProp extends Todo{
	onUpdateTask: (todo: Todo) => void
}

export function TodoItem({ todo: content, completed: status, onUpdateTask, id }: TodoItemProp) {
	const defaultStatusColorClass =  'w-2 bg-yellow-400 m-1 h-2 rounded-full transition-colors';
	const statusColorCompleteClass = 'w-2 bg-green-400 m-1 h-2 rounded-full transition-colors';
	const [statusItem, setStatusItem] = useState(status);
	const handleStatus = (status: boolean) => {
		setStatusItem(status)
		onUpdateTask({todo: content, completed: status, id: id})
	}
		
	return (
		<>
			<section className='p-3 text-lg flex justify-between transition-colors hover:bg-slate-300 items-center h-auto'>
				<section className='flex items-center'>
					<div style={{minWidth: '8px'}}  className={statusItem ? statusColorCompleteClass : defaultStatusColorClass}></div>
					<p className='p-1 ml-2 overflow-hidden max-w-xl'>{content}</p>
				</section>
				<Checkbox style={{minWidth: '16px', minHeight: '16px'}}
					checked={statusItem}
					onChange={(e) => handleStatus(e)}
					className='group transition-colors block size-4 rounded border bg-white data-[checked]:bg-green-400'>
					<svg className='stroke-white opacity-0 group-data-[checked]:opacity-100' viewBox='0 0 14 14' fill='none'>
						<path d='M3 8L6 11L11 3.5' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' />
					</svg>
				</Checkbox>
			</section>
			<div className='flex-grow border-t border-gray-300'></div>
		</>
	);
}