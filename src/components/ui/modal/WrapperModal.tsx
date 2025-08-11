export function WrapperModal({ children }: { children?: React.ReactNode }) {
	return (
		<>
			<div className='bg-opacity-50 bg-background/90 fixed inset-0 z-40' />

			{children}
		</>
	);
}
