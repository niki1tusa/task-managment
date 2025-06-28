import type { ITask } from '@/types/task.types'
import React from 'react'

export const Header = ({task}: {task: ITask}) => {
  return (
    	<div className='flex mx-5 gap-3 mt-3'>
				<div className='bg-primary rounded-full w-9 h-9 flex items-center justify-center shadow shadow-neutral-400'>
					<task.iconTheme color='#725cee' />
				</div>
				<div className='flex flex-col'>
					<span className='font-medium'>{task.title}</span>
					<span className='text-gray'>{task.deadline}</span>
				</div>
				<div className='flex -space-x-2'>
					<div className='bg-primary rounded-full w-9 h-9 flex items-center justify-center shadow shadow-neutral-400'>
						1
					</div>
					<div className='bg-primary rounded-full w-9 h-9 flex items-center justify-center shadow shadow-neutral-400'>
						2
					</div>
					<div className='bg-primary rounded-full w-9 h-9 flex items-center justify-center shadow shadow-neutral-400'>
						3
					</div>
				</div>
			</div>
  )
}
