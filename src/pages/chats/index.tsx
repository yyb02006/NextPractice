import Layout from '@/components/layout';
import type { NextPage } from 'next';
import ChatRoom from '@/components/chat-room';

const chat: NextPage = () => {
	return (
		<Layout
			title='키보드 배틀'
			hasTabBar={true}
			seoTitle='키보드 싸이퍼 경기 목록'
		>
			<div className='bg-[#101010] text-[#fafafa] font-SCoreDream py-12 space-y-4'>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((arr, i) => (
					<div key={i}>
						<ChatRoom
							id={arr}
							name='Steve Jebs'
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
						</ChatRoom>
					</div>
				))}
			</div>
		</Layout>
	);
};

export default chat;
