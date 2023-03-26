import type { NextPage } from 'next';

const CommunityPostDetail: NextPage = () => {
	return (
		<div className='bg-[#101010] text-[#fafafa] h-full min-h-screen font-SCoreDream px-4 py-12'>
			<div className='flex items-center gap-2 mt-4'>
				<div className='bg-gray-400 w-12 aspect-square rounded-lg' />
				<div>
					<p className='font-medium text-lg'>Von Neumann</p>
					<p className='font-SCoreDream font-normal text-xs text-gray-500 cursor-pointer hover:text-gray-300 hover:translate-x-1 transition'>
						자세히 알아보기 &rarr;
					</p>
				</div>
			</div>
			<div className='flex flex-col mt-8'>
				<span className='font-GmarketSans font-bold text-xl'>
					<span className='text-green-500'>#콤-퓨타</span>
				</span>
				<span className='mt-1'>
					<span className='text-xl text-pink-400'>Q.</span> 컴퓨터를 샀는데
					HDMI를 어디다 끼우는 거죠ㅠㅠ?
				</span>
				<div className='mt-12 flex justify-end items-center font-light gap-4 text-sm text-gray-200'>
					<span className='flex items-center gap-1'>
						<svg
							className='w-4 h-4'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
							></path>
						</svg>
						<span>궁금해요 1</span>
					</span>
					<span className='flex items-center gap-1'>
						<svg
							className='w-4 h-4'
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
						<span>답변 1</span>
					</span>
				</div>
			</div>
			<div className='mt-4 space-y-6'>
				{[1, 1, 1, 1, 1].map((arr, i) => (
					<div key={i} className='bg-[#1a1a1a] p-4 rounded-md'>
						<div className='flex items-center gap-2'>
							<div className='bg-gray-400 w-8 aspect-square rounded-lg' />
							<div>
								<p className='font-light text-sm text-gray-200'>Steve Jebs</p>
								<p className='font-SCoreDream font-normal text-xs text-gray-500'>
									2시간 전
								</p>
							</div>
						</div>
						<div className='mt-6 text-base font-light text-gray-200'>
							<span className='text-lg text-green-500'>A.</span> DP케이블
							사셔야해요!
						</div>
					</div>
				))}
			</div>
			<div className='mt-8 select-none'>
				<label
					htmlFor='description'
					className='font-light text-sm text-gray-300'
				></label>
				<div>
					<textarea
						rows={4}
						id='description'
						className='appearance-none mt-2 text-gray-600 w-full bg-gray-200 rounded-sm placeholder-gray-400 outline-none focus:border-green-600 focus:ring-[2px] focus:ring-green-600'
						placeholder='엣헴... 그거 그렇게 하는 거 아닌데...'
					/>
				</div>
			</div>
			<button className='mt-4 w-full bg-green-600 rounded-sm py-2 hover:bg-emerald-500 font-medium focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition-color duration-100'>
				공짜로 훈수두기
			</button>
		</div>
	);
};

export default CommunityPostDetail;
