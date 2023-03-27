import type { NextPage } from 'next';
import Layout from '@/components/layout';

const Profile: NextPage = () => {
	return (
		<Layout title='프로필' hasTabBar={true}>
			<div className='bg-[#101010] text-[#fafafa] h-full min-h-screen font-SCoreDream px-4 py-12'>
				<div className='flex items-center gap-2 mt-4'>
					<div className='bg-pink-400 w-12 aspect-square rounded-md' />
					<div>
						<p className='font-medium text-lg'>Steve Jebs</p>
						<p className='font-SCoreDream font-normal text-xs text-gray-400 cursor-pointer hover:text-gray-300 hover:translate-x-1 transition'>
							프로필 수정하기 &rarr;
						</p>
					</div>
				</div>
				<div className='flex justify-around mt-8'>
					<div className='flex flex-col items-center w-full py-4 hover:bg-green-700 cursor-pointer rounded-sm'>
						<div>
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
						</div>
						<span className='font-GmarketSans font-bold text-lg text-gray-200'>
							판매내역
						</span>
					</div>
					<div className='flex flex-col items-center w-full py-4 hover:bg-green-700 cursor-pointer rounded-sm'>
						<div>
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
						</div>
						<span className='font-GmarketSans font-bold text-lg text-gray-200'>
							구매내역
						</span>
					</div>
					<div className='flex flex-col items-center w-full py-4 hover:bg-green-700 cursor-pointer rounded-sm'>
						<div>
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
						</div>
						<span className='font-GmarketSans font-bold text-lg text-gray-200'>
							관심목록
						</span>
					</div>
				</div>
				<div className='mt-16'>
					<span className='font-GmarketSans font-bold text-2xl'>
						<span className='text-green-500'>G</span>-리는 리뷰
					</span>
					<div>
						<div />
						<div className='flex items-center gap-2 mt-4'>
							<div className='bg-indigo-500 w-8 aspect-square rounded-md' />
							<div>
								<p className='font-light text-xs text-gray-300'>Von neumann</p>
								<div className='flex justify-start'>
									<svg
										className='text-yellow-400 h-4 w-4'
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
										aria-hidden='true'
									>
										<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
									</svg>
									<svg
										className='text-yellow-400 h-4 w-4'
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
										aria-hidden='true'
									>
										<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
									</svg>
									<svg
										className='text-yellow-400 h-4 w-4'
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
										aria-hidden='true'
									>
										<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
									</svg>
									<svg
										className='text-yellow-400 h-4 w-4'
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
										aria-hidden='true'
									>
										<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
									</svg>
									<svg
										className='text-gray-400 h-4 w-4'
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
										aria-hidden='true'
									>
										<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
									</svg>
								</div>
							</div>
						</div>
						<div />
					</div>
					<div className='mt-2 text-gray-300 text-sm leading-6 font-light'>
						<p>
							Normally, both your asses would be dead as fucking fried chicken,
							but you happen to pull this shit while I&apos;m in a transitional
							period so I don&apos;t wanna kill you, I wanna help you. But I
							can&apos;t give you this case, it don&apos;t belong to me.
							Besides, I&apos;ve already been through too much shit this morning
							over this case to hand it over to your dumb ass.
						</p>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Profile;
