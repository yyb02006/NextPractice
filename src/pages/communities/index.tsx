import type { NextPage } from 'next';

const Community: NextPage = () => {
	return (
		<div className='bg-[#101010] text-[#fafafa] h-full min-h-screen font-SCoreDream px-4 py-12 space-y-16'>
			{[1, 1, 1, 1, 1, 1, 1].map((arr, i) => (
				<div key={i} className='flex flex-col'>
					<span className='font-GmarketSans font-bold text-xl'>
						<span className='text-green-500'>#콤-퓨타</span>
					</span>
					<span className='mt-1'>
						<span className='text-xl text-pink-400'>Q.</span> 컴퓨터를 샀는데
						HDMI를 어디다 끼우는 거죠ㅠㅠ?
					</span>
					<div className='mt-8 flex justify-start font-normal text-xs text-gray-400 gap-2'>
						<span>Von Neumann</span>
						<span className='text-gray-600 font-medium'>18시간 전</span>
					</div>
					<div className='mt-4 flex justify-end items-center font-light gap-4 text-sm text-gray-200'>
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
			))}
			<button className='fixed flex justify-center items-center shadow-md shadow-green-800 bg-green-600 w-12 aspect-square rounded-full bottom-8 right-6 hover:bg-emerald-500 transition-colors'>
				<svg
					className='w-6 h-6'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
					></path>
				</svg>
			</button>
		</div>
	);
};

export default Community;
