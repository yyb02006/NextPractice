import type { NextPage, NextPageContext } from 'next';
import Layout from '@/components/layout';
import Link from 'next/link';
import useUser from '@/libs/client/useUser';
import useSWR, { SWRConfig } from 'swr';
import { Review, User } from '@prisma/client';
import { clsNm, imageUrl } from '@/libs/client/utils';
import { ssrSessionWrapper } from '@/libs/server/sessionWrapper';
import client from '@/libs/server/client';

interface ReviewsWithUser extends Review {
	createdBy: User;
}

interface ReviewsProps {
	success: boolean;
	reviews: ReviewsWithUser[];
}

const Profile: NextPage = () => {
	const { user } = useUser();
	const { data: reviewData } = useSWR<ReviewsProps>(
		'/api/profiles/own/reviews'
	);
	return (
		<Layout title='프로필' hasTabBar={true} seoTitle='프로필'>
			<div className='bg-[#101010] text-[#fafafa] font-SCoreDream px-4 py-12'>
				<div className='flex items-center gap-2 mt-4'>
					{user?.avatar ? (
						<img
							src={imageUrl(user.avatar, 'avatar')}
							className='object-cover w-16 aspect-square rounded-md'
						/>
					) : (
						<div className='bg-pink-400 w-16 aspect-square rounded-md' />
					)}
					<div>
						<p className='font-medium text-lg'>{user?.name}</p>
						<Link href='/profiles/edit'>
							<p className='font-SCoreDream font-normal text-xs text-gray-400 cursor-pointer hover:text-gray-300 hover:translate-x-1 transition'>
								프로필 수정하기 &rarr;
							</p>
						</Link>
					</div>
				</div>
				<div className='flex justify-around mt-16 space-x-2'>
					<div className='w-full py-4 hover:bg-green-700 cursor-pointer rounded-sm bg-[#202020]'>
						<Link href='/profiles/sold'>
							<div className='flex flex-col items-center'>
								<svg
									className='w-8 h-8'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
									></path>
								</svg>
								<span className='font-GmarketSans font-bold text-lg text-gray-200'>
									판매내역
								</span>
							</div>
						</Link>
					</div>
					<div className='w-full py-4 hover:bg-green-700 cursor-pointer rounded-sm bg-[#202020]'>
						<Link href='/profiles/bought'>
							<div className='flex flex-col items-center'>
								<svg
									className='w-8 h-8'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
									></path>
								</svg>
								<span className='font-GmarketSans font-bold text-lg text-gray-200'>
									구매내역
								</span>
							</div>
						</Link>
					</div>
					<div className='w-full py-4 hover:bg-green-700 cursor-pointer rounded-sm bg-[#202020]'>
						<Link href='/profiles/favorite'>
							<div className='flex flex-col items-center'>
								<svg
									className='w-8 h-8'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
									></path>
								</svg>
								<span className='font-GmarketSans font-bold text-lg text-gray-200'>
									관심목록
								</span>
							</div>
						</Link>
					</div>
				</div>
				<div className='mt-16 space-y-6'>
					<span className='font-GmarketSans font-bold text-2xl'>
						<span className='text-green-500'>G</span>-리는 리뷰
					</span>
					{reviewData?.reviews.map((review) => (
						<div key={review.Id}>
							<div className='flex items-center gap-2 mt-4'>
								{review.createdBy.avatar ? (
									<img
										src={imageUrl(review.createdBy.avatar, 'avatar')}
										alt={review.createdBy.name}
									/>
								) : (
									<div className='bg-indigo-500 w-8 aspect-square rounded-md' />
								)}
								<div>
									<p className='font-normal text-sm text-gray-300'>
										{review.createdBy.name}
									</p>
									<div className='flex justify-start'>
										{[...Array(5)].map((_, index) => (
											<svg
												key={index}
												className={clsNm(
													review.rating < index + 1
														? 'text-gray-400'
														: 'text-yellow-400',
													' h-4 w-4'
												)}
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 20 20'
												fill='currentColor'
												aria-hidden='true'
											>
												<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
											</svg>
										))}
									</div>
								</div>
							</div>
							<div className='mt-2 text-gray-300 text-sm leading-6 font-light'>
								<p>{review.review}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</Layout>
	);
};

const Page: NextPage<{ profile: User }> = ({ profile }) => {
	return (
		<SWRConfig
			value={{
				//key값은 query내용까지 포함
				fallback: {
					'/api/users/own?path=/profiles': { success: true, profile },
				},
			}}
		>
			<Profile />
		</SWRConfig>
	);
};

/**
 * 복잡해보이는 함수일 수 있지만, getServerSideProps라는 함수는 {props:{}}을 리턴하기만 하면 되기 때문에,
 * {props:{}}를 리턴할 수 있는 모양이면 콜백을 사용하는 함수던, 어떤 함수던 상관없이 props를 전달할 수 있다.
 */
export const getServerSideProps = ssrSessionWrapper(async function ({
	req,
}: NextPageContext) {
	const profile = await client.user.findUnique({
		where: { id: req?.session.user?.id },
	});

	//nextjs가 date객체직렬화(객체를 byte단위로 주고받기 위해 일자로 나열하는 것)를 못함
	return { props: { profile: JSON.parse(JSON.stringify(profile)) } };
});

export default Page;
