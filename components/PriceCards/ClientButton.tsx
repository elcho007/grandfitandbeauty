'use client';
import React from 'react';

type Props = {
	children: React.ReactNode;
};

const ClientButton = ({ children }: Props) => {
	return (
		<button className='priceCards-toggle flex items-center justify-center rounded-2xl  bg-[#283b35] text-white text-sm px-2 py-2 w-64'>
			<span className=' px-4 py-2 rounded-lg text-white'>{children}</span>
		</button>
	);
};

export default ClientButton;
