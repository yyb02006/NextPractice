import React from 'react';
import Link from 'next/link';

interface GoodsProps {
	title: string;
	children: React.ReactNode;
	color: string;
	price: number;
	id: number;
	like: number;
	[key: string]: any;
}

export default function Goods({
	title,
	id,
	color,
	price,
	like,
	children,
	...rest
}: GoodsProps) {
	return (
		<div className='flex flex-col' {...rest}>
			<div>
				<h3 className='font-GmarketSans font-bold text-[1.75rem] leading-6'>
					<span className='text-green-500'>New</span> {title}
				</h3>
				<Link href={`/details/${id}`}>
					<div className='w-full bg-indigo-600 rounded-sm mt-1 hover:bg-pink-400 transition-colors'>
						{children}
					</div>
				</Link>
				<div className='flex justify-between items-center mt-2 font-normal'>
					<span className='font-light text-base text-gray-200'>{color}</span>
					<span className='text-xl'>￦{price}</span>
				</div>
			</div>
			<div className='flex justify-end gap-5 my-3'>
				<div className='flex items-center font-SCoreDream gap-1 text-sm font-normal hover:text-green-500 cursor-pointer'></div>
				<div className='flex items-center font-SCoreDream gap-1 text-sm font-normal hover:text-green-500 cursor-pointer'>
					<span className='text-gray-300 text-sm font-normal'>
						좋아연 {like}
					</span>
					<svg
						className='w-5 h-5'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
						></path>
					</svg>
				</div>
			</div>
		</div>
	);
}
