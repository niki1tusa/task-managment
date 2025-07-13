import type { ZodSchema } from 'zod';

import Form from '../ui/form/Form';

interface Props {
	setAuthCondition: (arg: string) => void;
	zodScheme: ZodSchema;
	linkText: string;
	children?: React.ReactNode;
	isName?: boolean;
	isEmail?: boolean;
	isPassword?: boolean;
}
export function HomeAuthForm({
	setAuthCondition,
	zodScheme,
	linkText,
	children,
	isName,
	isEmail,
	isPassword,
}: Props) {
	return (
		<div className='flex flex-col gap-2'>
			<Form
				isLogin={true}
				isNameField={isName}
				isEmailField={isEmail}
				isPassowrdField={isPassword}
				zodScheme={zodScheme}
				btnText='Submit'
				btnClassName='bg-white/40 py-1.5 hover:text-purple-950 duration-300 text-sm px-3 hover:bg-white/60 w-[30%] rounded-4xl  text-white transition-colors'
			/>
			<div className='text-[0.6em]'>
				{linkText === 'Sign Up' ? "Don't have on accaunt?" : 'Already have on accaunt?'}
				<button
					className='ml-1 border-b border-cyan-400 pb-[1px] text-cyan-400'
					onClick={() => setAuthCondition(linkText === 'Sign Up' ? 'register' : 'login')}
				>
					{linkText}
				</button>
				{children}
			</div>
		</div>
	);
}
