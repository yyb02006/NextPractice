import React from 'react';
import Link from 'next/link';

interface GoodsProps {
	title: string;
	children: React.ReactNode;
	color: string;
	price: number;
	id: number;
	comment: number;
	like: number;
}

export default function Goods({
	title,
	id,
	color,
	price,
	comment,
	like,
	children,
}: GoodsProps) {
	return (
		<div className='flex flex-col'>
			<div>
				<h3 className='font-bold text-3xl'>
					<span className='text-green-500'>New</span> {title}
				</h3>
				<Link href={`/details/${id}`}>
					<div className='w-full aspect-[1/1] bg-indigo-600 rounded-md mt-1 hover:bg-pink-400 transition-colors'>
						{children}
					</div>
				</Link>
				<div className='flex justify-between items-center mt-2 font-normal'>
					<span className='font-light text-base text-gray-200'>{color}</span>
					<span className='text-xl'>${price}</span>
				</div>
			</div>
			<div className='flex justify-end gap-5 my-3'>
				<div className='flex items-center font-SCoreDream gap-1 text-sm font-normal hover:text-green-500 cursor-pointer'>
					<span className='text-gray-200 font-light'>훈수 {comment}</span>
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
							d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
						></path>
					</svg>
				</div>
				<div className='flex items-center font-SCoreDream gap-1 text-sm font-normal hover:text-green-500 cursor-pointer'>
					<span className='text-gray-200 font-light'>좋아연 {like}</span>
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
