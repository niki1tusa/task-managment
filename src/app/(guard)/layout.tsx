import GuardClientLayout from "./GuardClientLayout";

interface Props {
	children: React.ReactNode;
}
export default async function GuardLayout({ children }: Props) {
	
	return <GuardClientLayout>{children}</GuardClientLayout>;
}
