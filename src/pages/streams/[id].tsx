import type { NextPage } from 'next';
import Layout from '@/components/layout';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Stream } from '@prisma/client';

interface StreamProps {
	success: boolean;
	stream: Stream;
}

const LiveStreamDetail: NextPage = () => {
	const router = useRouter();
	const { data, isLoading } = useSWR(
		//논리연산 안하면 쿼리아이디 없당...
		router.query.id && `/api/streams/${router.query.id}`
	);
	return (
		<Layout canGoBack={true} hasTabBar={true}>
			<div className='bg-[#101010] text-[#fafafa] font-SCoreDream py-12'>
				<div className='w-full'>
					<div className='w-full bg-indigo-500 aspect-video rounded-sm'></div>
					<div className='px-4'>
						<h3 className='mt-3 font-GmarketSans font-bold text-xl text-gray-200'>
							우리 스마트폰이 달라졌어요!
						</h3>
						<div className='flex justify-between font-normal text-xs text-gray-400'>
							<span>iphone_15_Pro_owner 님의 라이브</span>
							<span>2시간째 방송중</span>
						</div>
					</div>
				</div>
				<div className='mt-16 h-[40vh] overflow-y-scroll scroll-m-0'>
					<div className='flex items-start gap-2 mt-4 bg-[#1a1a1a] p-4'>
						<div className='bg-pink-400 w-10 aspect-square rounded-md' />
						<div>
							<div className='font-normal text-xs text-gray-400'>
								Steve Jebs
							</div>
							<div className='font-SCoreDream font-light text-sm leading-6 text-gray-200 w-[80%] break-keep'>
								아이폰의 아름다움을 모르는 당신이 불쌍해요!
							</div>
						</div>
					</div>
					<div className='flex justify-end items-start gap-2 mt-4 bg-[#1a1a1a] p-4'>
						<div className='flex flex-col items-end'>
							<div className='font-normal text-xs text-gray-400 w-[80%]'>
								Von Neumann
							</div>
							<div className='font-SCoreDream font-light text-sm leading-6 text-left text-gray-200 w-[80%] break-keep'>
								갤럭시의 놀라움을 모르는 당신이 백 배는 더!
							</div>
						</div>
						<div className='bg-indigo-500 w-10 aspect-square rounded-md' />
					</div>
					<div className='flex items-start gap-2 mt-4 bg-[#1a1a1a] p-4'>
						<div className='bg-pink-400 w-8 aspect-square rounded-md' />
						<div>
							<div className='font-normal text-xs text-gray-400'>
								Steve Jebs
							</div>
							<div className='font-SCoreDream font-light text-sm leading-6 text-gray-300 max-w-[80%] break-keep'>
								아이폰의 아름다움을 모르는 당신이 불쌍해요!
							</div>
						</div>
					</div>
					<div className='flex justify-end items-start gap-2 mt-4 bg-[#1a1a1a] p-4'>
						<div className='flex flex-col items-end'>
							<div className='font-normal text-xs text-gray-400'>
								Von Neumann
							</div>
							<div className='font-SCoreDream font-light text-sm leading-6 text-right text-gray-300 max-w-[80%] break-keep'>
								갤럭시의 놀라움을 모르는 당신이 백 배는 더!
							</div>
						</div>
						<div className='bg-indigo-500 w-12 aspect-square rounded-md' />
					</div>
					<div className='flex items-start gap-2 mt-4 bg-[#1a1a1a] p-4'>
						<div className='bg-pink-400 w-8 aspect-square rounded-md' />
						<div>
							<div className='font-normal text-xs text-gray-400'>
								Steve Jebs
							</div>
							<div className='font-SCoreDream font-light text-sm leading-6 text-gray-300 max-w-[80%] break-keep'>
								아이폰의 아름다움을 모르는 당신이 불쌍해요!
							</div>
						</div>
					</div>
					<div className='flex justify-end items-start gap-2 mt-4 bg-[#1a1a1a] p-4'>
						<div className='flex flex-col items-end'>
							<div className='font-normal text-xs text-gray-400'>
								Von Neumann
							</div>
							<div className='font-SCoreDream font-light text-sm leading-6 text-right text-gray-300 max-w-[80%] break-keep'>
								갤럭시의 놀라움을 모르는 당신이 백 배는 더!
							</div>
						</div>
						<div className='bg-indigo-500 w-12 aspect-square rounded-md' />
					</div>
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
		</Layout>
	);
};

export default LiveStreamDetail;
