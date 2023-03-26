import type { NextPage } from 'next';

const chat: NextPage = () => {
	return (
		<div className='bg-[#101010] text-[#fafafa] h-full min-h-screen font-SCoreDream py-12'>
			{[1, 2, 3, 4, 5, 6].map((arr, i) => (
				<div key={i}>
					<div className='flex items-center gap-2 mt-4 bg-[#1a1a1a] p-4'>
						<div className='bg-pink-400 w-12 aspect-square rounded-md' />
						<div>
							<p className='font-normal text-xs text-gray-400'>Steve Jebs</p>
							<p className='font-SCoreDream font-medium text-sm text-gray-200'>
								프론트엔드의 아름다움을 모르는 당신이 불쌍해요!
							</p>
						</div>
					</div>
					<div className='flex justify-end items-center gap-2 mt-4 bg-[#1a1a1a] p-4'>
						<div>
							<p className='font-normal text-xs text-right text-gray-400'>
								Von Neumann
							</p>
							<p className='font-SCoreDream font-medium text-sm text-gray-200'>
								백엔드의 놀라움을 모르는 당신이 백 배는 더!
							</p>
						</div>
						<div className='bg-indigo-500 w-12 aspect-square rounded-md' />
					</div>
				</div>
			))}
		</div>
	);
};

export default chat;
