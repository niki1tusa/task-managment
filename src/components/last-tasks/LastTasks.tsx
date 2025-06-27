import { Task } from "./Task";
import { tasks } from "./task.data";

export const LastTasks = () => {
    const count = tasks.length
	return (
		<div className="mt-5">
			<h1 className="mb-3 font-medium text-[22px]">Last Tasks ({count})</h1>
			<div className='grid grid-cols-3 gap-2 '>
				{
                    tasks.map(task=>(
                        <Task key={task.id} task={task}/>
                    ))
                }
			</div>
		</div>
	);
};
