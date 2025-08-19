import { Copy } from 'lucide-react';
import { useState } from 'react';

export function BtnCopyName({ text }: { text: string | null }) {
	const [copied, setCopied] = useState(false);
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(text || '');
			setCopied(true);
			setTimeout(() => setCopied(false), 1200);
		} catch (e) {
			console.error(e);
		}
	};
	return (
		<button
			onClick={handleCopy}
			type='button'
			className='flex items-center gap-3'
			title='Click to copy'
		>
			<Copy size={18} /> <div>{copied ? 'Copied!' : 'Copy name'}</div>
		</button>
	);
}
