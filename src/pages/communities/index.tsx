import FloatingButton from '@/components/floating-button';
import Layout from '@/components/layout';
import { Post } from '@prisma/client';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

interface PostWithUser extends Post {
	user: { name: string };
	_count: { wonderToo: number; answer: number };
}

interface PostProps {
	success: boolean;
	posts: PostWithUser[];
}

const Community: NextPage = () => {
	const router = useRouter();
	const {
		data: postData,
		isLoading,
		mutate,
	} = useSWR<PostProps>('/api/communities');
	return (
		<Layout title='질문 & 답변' hasTabBar={true}>
			<div className='bg-[#101010] text-[#fafafa] font-SCoreDream px-4 py-12 space-y-16'>
				{postData?.posts?.map((post) => (
					<div key={post.Id} className='flex flex-col'>
						<span className='text-green-500 font-GmarketSans font-bold text-xl'>
							#{post.category}
						</span>
						<Link href={`/communities/${post.Id}`}>
							<span className='mt-1'>
								<span className='mt-1 text-xl text-pink-400'>Q.</span>{' '}
								{post.question}
							</span>
						</Link>
						<div className='mt-8 flex justify-start font-normal text-xs text-gray-400 gap-2'>
							<span>{post.user.name}</span>
							<span className='text-gray-600 font-medium'></span>
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
								<span>궁금해요 {post._count.wonderToo}</span>
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
								<span>답변 {post._count.answer}</span>
							</span>
						</div>
					</div>
				))}
				<FloatingButton href='/communities/write'>
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
				</FloatingButton>
			</div>
		</Layout>
	);
};

export default Community;
