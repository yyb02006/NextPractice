import Layout from '@/components/layout';
import type { NextPage } from 'next';
import Button from '@/components/button';
import TextArea from '@/components/textarea';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import useMutation from '@/libs/client/useMutation';
import { useForm } from 'react-hook-form';
import { Answer, Post, User } from '@prisma/client';

interface AnswerForm {
	answer: string;
}

interface AnswerWithUser extends Answer {
	user: User;
}

interface PostWithMany extends Post {
	user: User;
	answer: AnswerWithUser[];
	_count: { wonderToo: number; answer: number };
}

interface DetailPostProps {
	success: boolean;
	post: PostWithMany;
}

const CommunityPostDetail: NextPage = () => {
	const router = useRouter();
	const { data: detailPostData, mutate } = useSWR<DetailPostProps>(
		router.query.id && `/api/communities/${router.query.id}`
	);
	const [sendAnswer, { loading, data: sendRes }] = useMutation(
		router.query.id ? `/api/communities/${router.query}` : ''
	);
	const { register, handleSubmit } = useForm<AnswerForm>();

	const onValid = (validData: AnswerForm) => {
		if (loading) return;
		sendAnswer(validData);
		console.log(validData);
	};

	console.log(detailPostData);

	return (
		<Layout canGoBack={true} hasTabBar={true}>
			<div className='bg-[#101010] text-[#fafafa] font-SCoreDream px-4 py-12'>
				<div className='flex items-center gap-2'>
					<div className='bg-gray-400 w-12 aspect-square rounded-lg' />
					<div>
						<p className='font-medium text-lg'>
							{detailPostData?.post.user.name}
						</p>
						<p className='font-SCoreDream font-normal text-xs text-gray-400 cursor-pointer hover:text-gray-300 hover:translate-x-1 transition'>
							자세히 알아보기 &rarr;
						</p>
					</div>
				</div>
				<div className='flex flex-col mt-8'>
					<span className='font-GmarketSans font-bold text-xl'>
						<span className='text-green-500'>
							#{detailPostData?.post.category}
						</span>
					</span>
					<span className='mt-1'>
						<span className='text-xl text-pink-400'>Q.</span>{' '}
						{detailPostData?.post.question}
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
				<form onSubmit={handleSubmit(onValid)} className='space-y-4 mt-8'>
					<TextArea
						label=''
						name='comment'
						placeholder='엣헴... 그거 그렇게 하는 거 아닌데...'
						rows={4}
						register={register('answer', {
							required: '한마디 할 기회를 드리겠습니다.',
						})}
						required
					></TextArea>
					<Button name='공짜로 훈수두기'></Button>
				</form>
			</div>
		</Layout>
	);
};

export default CommunityPostDetail;
