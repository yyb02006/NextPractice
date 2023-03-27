import FloatingButton from '@/components/floating-button';
import Layout from '@/components/layout';
import Link from 'next/link';
import type { NextPage } from 'next';

const Live: NextPage = () => {
	return (
		<Layout title='라이브 커머스' hasTabBar={true}>
			<div className='bg-[#101010] text-[#fafafa] font-SCoreDream px-4 py-12 space-y-6'>
				{[1, 2, 3, 4, 5, 6].map((arr, i) => (
					<div key={i}>
						<Link href={`/live-streams/${i}`}>
							<div className='w-full bg-indigo-500 aspect-video rounded-sm'></div>
							<div className='inline-block mt-2 font-medium text-gray-200 text-sm'>
								<span className='text-green-500'>우리</span> 스마트폰이
								달라졌어요!
							</div>
						</Link>
					</div>
				))}
				<FloatingButton href='/live-streams/create'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke-width='2'
						stroke='currentColor'
						className='w-6 h-6'
					>
						<path
							strokeLinecap='round'
							d='M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z'
						/>
					</svg>
				</FloatingButton>
			</div>
		</Layout>
	);
};

export default Live;
