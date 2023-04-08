import FloatingButton from '@/components/floating-button';
import Layout from '@/components/layout';
import Link from 'next/link';
import type { NextPage } from 'next';
import useSWR from 'swr';
import { Stream } from '@prisma/client';

interface StreamsProps {
	success: boolean;
	streams: Stream[];
}

const Streams: NextPage = () => {
	const { data: streamsData, isLoading } = useSWR<StreamsProps>('/api/streams');
	return (
		<Layout title='라이브 커머스' hasTabBar={true}>
			<div className='bg-[#101010] text-[#fafafa] font-SCoreDream px-4 py-12 space-y-6'>
				{streamsData?.streams.map((stream) => (
					<div key={stream.Id}>
						<Link href={`/streams/${stream.Id}`}>
							<div className='w-full bg-indigo-500 aspect-video rounded-sm'></div>
							<div className='inline-block mt-2 font-medium text-gray-200 text-sm'>
								<span className='text-green-500'>
									{stream.name.length > 1
										? stream.name.slice(0, 2)
										: stream.name}
								</span>
								{stream.name.length > 1
									? stream.name.slice(2, stream.name.length)
									: null}
							</div>
						</Link>
					</div>
				))}
				<FloatingButton href='/streams/create'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth='2'
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

export default Streams;
