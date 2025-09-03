import { Avatar } from '@/components/ui/Avatar';
import BtnReturnBack from '@/components/ui/button/BtnReturnBack';
import { Title } from '@/components/ui/Title';


export default function SettingsClientPage() {



	return (
		<div className='space-y-6 px-7 py-3.5'>
			<BtnReturnBack text='Back to Dashboard' />

			<header className='border-b pb-4'>
				<Title heading='page'>Task &quot; &quot;</Title>
			</header>

			<section className='space-y-2 text-sm'>
				<div>
					<span className='font-medium text-gray-500'>Title:</span>
				</div>
				<div className='flex items-center gap-2'>
					<span className='font-medium text-gray-500'>Icon:</span>
				
				</div>
				<div>
					<span className='font-medium text-gray-500'>Owner:</span>
				</div>
				<div className='flex items-center gap-2'>
					<span className='font-medium text-gray-500'>Participants:</span>
					<div className='flex -space-x-2'>

					</div>
				</div>
				<div>
					<span className='font-medium text-gray-500'>Due:</span> 
				</div>
				<div>
					<span className='font-medium text-gray-500'>Start time:</span> 
				</div>
				<div>
					<span className='font-medium text-gray-500'>End time:</span> 
				</div>
				<div>
					<span className='font-medium text-gray-500'>Status task:</span>

				</div>
				<div>
					<span className='font-medium text-gray-500'>Channnel:</span> {}
				</div>
			</section>

			<section className='grid grid-cols-3 gap-5'>
				<div className='items-center rounded-lg border bg-gray-50 p-3'>
					<strong>Comment</strong>
					<p className='text-lg text-gray-600'>1</p>
				</div>
				<div className='rounded-lg border bg-gray-50 p-3'>
					<strong>Image</strong>
					<p className='text-lg text-gray-600'>2</p>
				</div>
				<div className='rounded-lg border bg-gray-50 p-3'>
					<strong>Link</strong>
					<p className='text-lg text-gray-600'>3</p>
				</div>
			</section>

			<section>
				<strong className='mb-2 block'>Subtasks:</strong>
				<ul className='space-y-1'>

				</ul>
			</section>
		</div>
	);
}
