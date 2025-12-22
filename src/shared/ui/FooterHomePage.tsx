export default function FooterHomePage() {
	const year = new Date().getFullYear();
	return (
		<footer className='text-muted-foreground my-5 block text-center text-xs md:fixed md:right-[50%] md:bottom-5 md:translate-x-[50%] md:transform'>
			&copy; {year} Task Hub. All rights reserved.
		</footer>
	);
}
