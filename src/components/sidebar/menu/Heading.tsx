import React from 'react';

export const Heading = ({ heading }: { heading: string }) => {
	return <span className='text-gray font-semibold text-lg'>{heading}</span>;
};
