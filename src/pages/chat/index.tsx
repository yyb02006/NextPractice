import type { NextPage } from 'next';

const chat: NextPage = () => {
	return (
		<div className='bg-[#101010] text-[#fafafa] h-full min-h-screen font-SCoreDream py-12'>
			{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((arr, i) => (
				<div key={i} className='flex items-center gap-2 mt-4 bg-[#1a1a1a] p-4'>
					<div className='bg-pink-400 w-12 aspect-square rounded-md' />
					<div>
						<p className='font-medium text-base text-gray-200'>Steve Jebs</p>
						<p className='font-medium text-xs text-gray-400'>
							프론트엔드의 아름다움을 모르는 당신이 불쌍해요!
						</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default chat;
