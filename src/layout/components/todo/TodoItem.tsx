import { useState } from 'react';
import { Checkbox } from '@headlessui/react';

export interface TodoItemProps {
	todo: string;
	completed: boolean;
}

export function TodoItem({ todo: content, completed: status }: TodoItemProps) {
	const defaultStatusColorClass = 'w-1.5 bg-yellow-400 m-1 rounded-md';
	const statusColorCompleteClass = 'w-1.5 bg-green-400 m-1 rounded-md';
	const [statusItem, setStatusItem] = useState(status);
	const handleStatus = (status: boolean) => setStatusItem(status);
	return (
		<>
			<section className='p-2 text-lg flex justify-between transition-colors hover:bg-slate-300 items-center h-auto'>
				<section className='flex'>
					<div className={statusItem ? statusColorCompleteClass : defaultStatusColorClass}></div>
					<p className='m-1'>{content}</p>
				</section>

				<Checkbox
					checked={statusItem}
					onChange={(e) => handleStatus(e)}
					className='group block size-4 rounded border bg-white data-[checked]:bg-green-400'>
					<svg className='stroke-white opacity-0 group-data-[checked]:opacity-100' viewBox='0 0 14 14' fill='none'>
						<path d='M3 8L6 11L11 3.5' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' />
					</svg>
				</Checkbox>
			</section>
			<div className='flex-grow border-t border-gray-300'></div>
		</>
	);
}
