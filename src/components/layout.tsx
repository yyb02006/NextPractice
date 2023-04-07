import { clsNm } from '@/libs/client/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface LayoutProps {
	title?: string;
	canGoBack?: boolean;
	hasTabBar?: boolean;
	children: React.ReactNode;
}

interface navButtonProps {
	path: string;
	color: string;
	title: string;
	svg: React.ReactNode;
}

const svgsObj = (): navButtonProps[] => {
	return [
		{
			path: '/',
			color: 'text-green-500',
			title: '집구석',
			svg: (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='w-8 h-8'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
					/>
				</svg>
			),
		},
		{
			path: '/streams',
			color: 'text-green-500',
			title: '라이브',
			svg: (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='w-8 h-8'
				>
					<path
						strokeLinecap='round'
						d='M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z'
					/>
				</svg>
			),
		},
		{
			path: '/communities',
			color: 'text-green-500',
			title: '커뮤니티',
			svg: (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='w-8 h-8'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
					/>
				</svg>
			),
		},
		{
			path: '/chats',
			color: 'text-green-500',
			title: '랩배틀',
			svg: (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='w-8 h-8'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z'
					/>
				</svg>
			),
		},
		{
			path: '/profiles',
			color: 'text-green-500',
			title: '프로필',
			svg: (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='w-8 h-8'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
					/>
				</svg>
			),
		},
	];
};

export default function Layout({
	title,
	canGoBack,
	hasTabBar,
	children,
}: LayoutProps) {
	const router = useRouter();
	const onClick = () => {
		router.back();
	};
	const svgs = svgsObj();
	return (
		<div className='bg-[#101010] h-full min-h-screen'>
			<div className={clsNm('pt-10', hasTabBar ? 'pb-32' : '')}>{children}</div>
			<div className='fixed top-0 max-w-lg px-4 h-[60px] bg-[#1a1a1a] shadow-md shadow-[#0a0a0a] w-full text-[20px] text-[#fafafa] font-bold font-GmarketSans flex items-center'>
				{canGoBack ? (
					<button
						onClick={onClick}
						className='text-3xl mr-4 flex justify-center items-center'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='6 0 24 24'
							strokeWidth={2}
							stroke='currentColor'
							className='w-6 h-6'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15.75 19.5L8.25 12l7.5-7.5'
							/>
						</svg>
					</button>
				) : null}
				{title ? <span className='relative top-[2px]'>{title}</span> : null}
			</div>
			{hasTabBar ? (
				<nav className='fixed flex pb-4 h-24 justify-around items-center bottom-0 w-full max-w-lg bg-[#1a1a1a] sha'>
					{svgs.map((svg, i) => (
						<Link key={i} href={svg.path}>
							<div
								className={clsNm(
									'flex flex-col items-center text-gray-300 space-y-1 w-16',
									/**
									 * clsNm함수 argument의 타입은 string이어야 하기 때문에 삼항연산자 조건문 router.pathname === svg.path의 표현식이 string이어야함(text-green-500)
									 * 같은 이유로 논리연산자는 false를 뱉어낼 수 있기 때문에 사용할 수 없음.
									 */
									svg.path === '/'
										? router.pathname === '/'
											? 'text-green-500'
											: ''
										: '',
									svg.path !== '/'
										? router.pathname.match(`^${svg.path}`)
											? 'text-green-500'
											: ''
										: ''
								)}
							>
								{svg.svg}
								<span className='text-xs font-medium'>{svg.title}</span>
							</div>
						</Link>
					))}
				</nav>
			) : null}
		</div>
	);
}
