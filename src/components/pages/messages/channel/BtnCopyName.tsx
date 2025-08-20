import clsx from 'clsx';
import { Copy, SquareCheckBig } from 'lucide-react';
import { useState } from 'react';

export function BtnCopyName({ text }: { text: string | null }) {
	const [copied, setCopied] = useState(false);
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(text || '');
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (e) {
			console.error(e);
		}
	};
	return (
		<button
			onClick={handleCopy}
			type='button'
			className={clsx(
				copied ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
				'flex items-center rounded p-1 gap-3 transition-all duration-200'
			)}
			title='Click to copy'
		>
			{copied ? <SquareCheckBig size={18} /> : <Copy size={18} />}
			<div>{copied ? 'Copied!' : 'Copy name'}</div>
		</button>
	);
}
