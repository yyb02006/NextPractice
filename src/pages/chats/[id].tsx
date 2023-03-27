import type { NextPage } from 'next';

const ChatDetail: NextPage = () => {
	return (
		<div className='bg-[#101010] text-[#fafafa] h-full min-h-screen font-SCoreDream py-12'>
			<div className='flex items-start gap-2 mt-4 bg-[#1a1a1a] p-4'>
				<div className='bg-pink-400 w-12 aspect-square rounded-md' />
				<div>
					<div className='font-normal text-xs text-gray-400'>Steve Jebs</div>
					<div className='font-SCoreDream font-medium text-base text-gray-200 w-5/6'>
						프론트엔드의 아름다움을 모르는 당신이 불쌍해요!
					</div>
				</div>
			</div>
			<div className='flex justify-end items-start gap-2 mt-4 bg-[#1a1a1a] p-4'>
				<div className='flex flex-col items-end'>
					<div className='font-normal text-xs text-gray-400'>Von Neumann</div>
					<div className='font-SCoreDream font-medium text-base text-right text-gray-200 w-5/6'>
						백엔드의 놀라움을 모르는 당신이 백 배는 더!
					</div>
				</div>
				<div className='bg-indigo-500 w-12 aspect-square rounded-md' />
			</div>
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
	);
};

export default ChatDetail;
