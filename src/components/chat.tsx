import React from 'react';

interface ChatProps {
	pos: 'left' | 'right';
	name: string;
	text: string;
	children: React.ReactNode;
}

export default function Chat({
	pos = 'left',
	name,
	text,
	children,
}: ChatProps) {
	return (
		<div>
			{pos === 'left' ? (
				<div className='flex items-start gap-2 mt-4 bg-[#1a1a1a] p-4'>
					<div className='bg-pink-400 w-12 aspect-square rounded-md'>
						{children}
					</div>
					<div>
						<div className='font-normal text-xs text-gray-400'>{name}</div>
						<div className='font-SCoreDream font-normal text-sm leading-6 text-gray-200 max-w-[80%] break-keep'>
							{text}
						</div>
					</div>
				</div>
			) : null}
			{pos === 'right' ? (
				<div className='flex justify-end items-start gap-2 mt-4 bg-[#1a1a1a] p-4'>
					<div className='flex flex-col items-end'>
						<div className='font-normal text-xs text-gray-400'>{name}</div>
						<div className='font-SCoreDream font-normal text-sm leading-6 text-right text-gray-200 max-w-[80%] break-keep'>
							{text}
						</div>
					</div>
					<div className='bg-indigo-500 w-12 aspect-square rounded-md'>
						{children}
					</div>
				</div>
			) : null}
		</div>
	);
}
