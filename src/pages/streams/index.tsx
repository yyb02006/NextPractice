import FloatingButton from '@/components/floating-button';
import Layout from '@/components/layout';
import Link from 'next/link';
import type { NextPage } from 'next';
import useSWR from 'swr';
import { Stream } from '@prisma/client';
import { SetStateAction, useEffect, useRef, useState } from 'react';

interface StreamsProps {
	success: boolean;
	streams: Stream[];
}

const Streams: NextPage = () => {
	const [page, setPage] = useState(0);
	const [streams, setStreams] = useState<Stream[]>([]);
	const {
		data: streamsData,
		isLoading,
		mutate,
	} = useSWR<StreamsProps>(`/api/streams?page=${page}&size=10`);
	const options = {
		root: null,
		threshold: 0.2,
	};

	console.log(streams);

	useEffect(() => {
		if (streamsData?.streams) {
			setStreams((p) => [...p, ...streamsData?.streams]);
		}
	}, [streamsData]);

	const target = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (target.current && streamsData) {
			const observer = new IntersectionObserver(async (entries, observer) => {
				const entry = entries[0];
				if (entry.isIntersecting && !isLoading) {
					setPage((p) => p + 1);
					//할 거 다 하고 unobserve를 해줘야 setPage가 마구잡이로 실행되는 것 막을 수 있음
					observer.unobserve(entry.target);
				}
			}, options);
			observer.observe(target.current);
		}
	}, [target, streamsData, setPage]);

	return (
		<Layout title='라이브 커머스' hasTabBar={true}>
			<div className='bg-[#101010] text-[#fafafa] font-SCoreDream px-4 py-12 space-y-6'>
				{streams.map((stream, index) => (
					<div key={index}>
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
				<div ref={target}></div>
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
