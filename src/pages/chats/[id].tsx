import Layout from '@/components/layout';
import type { NextPage } from 'next';
import Chat from '@/components/chat';

const ChatDetail: NextPage = () => {
	return (
		<Layout canGoBack={true} seoTitle='키보드 싸이퍼 경기장'>
			<div className='bg-[#101010] text-[#fafafa] font-SCoreDream py-12'>
				<Chat
					name='Steve Jebs'
					pos='left'
					text='프론트엔드의 아름다움을 모르는 당신이 불쌍해요!'
				>
					<svg
						className='w-full h-full'
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
				</Chat>
				<Chat
					name='Von Neumann'
					pos='right'
					text='백엔드의 놀라움을 모르는 당신이 백 배는 더!'
				>
					<svg
						className='w-full h-full'
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
				</Chat>
				<div className='fixed bottom-8 left-0 w-full mx-auto px-4 '>
					<div className='relative flex items-center '>
						<input
							type='text'
							className='appearance-none shadow-xl shadow-[#101010] pl-5 pr-14 text-gray-600 w-full bg-gray-200 rounded-full border-0 placeholder-gray-400 outline-none focus:border-green-600 focus:ring-[2px] focus:ring-green-600'
						/>
						<button className='absolute pl-2 pr-4 h-full flex justify-center items-center text-2xl font-bold text-green-600 right-0 rounded-full focus:outline-none'>
							<span>&rarr;</span>
						</button>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default ChatDetail;
