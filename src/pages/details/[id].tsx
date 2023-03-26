import type { NextPage } from 'next';

const Detail: NextPage = () => {
	return (
		<div className='bg-[#101010] text-[#fafafa] h-full font-Roboto px-4 py-8'>
			<div>
				<div className='bg-indigo-600 w-full aspect-square rounded-md' />
				<div className='flex items-center gap-2 mt-4'>
					<div className='bg-pink-400 w-12 aspect-square rounded-md' />
					<div>
						<p className='font-medium text-lg'>Steve Jebs</p>
						<p className='font-SCoreDream font-normal text-sm text-gray-500 cursor-pointer hover:text-gray-300 hover:translate-x-1 transition'>
							자세히 알아보기 &rarr;
						</p>
					</div>
				</div>
				<div className='mt-8'>
					<h1 className='font-bold text-right text-3xl'>
						Galaxy <span className='text-green-500'>S50</span>
					</h1>
					<p className='font-medium text-gray-400 text-right text-base mr-[2px] mt-2'>
						￦140,000
					</p>
					<p className='mt-6 font-light leading-[32px]'>
						My money&apos;s in that office, right? If she start giving me some
						bullshit about it ain&apos;t there, and we got to go someplace else
						and get it, I&apos;m gonna shoot you in the head then and there.
						Then I&apos;m gonna shoot that bitch in the kneecaps, find out where
						my goddamn money is. She gonna tell me too. Hey, look at me when
						I&apos;m talking to you, motherfucker. You listen: we go in there,
						and that ni**a Winston or anybody else is in there, you the first
						motherfucker to get shot. You understand?
					</p>
					<div className='relative mt-10 flex justify-start h-10'>
						<button className='z-[1] bg-green-600 w-full rounded-md font-SCoreDream font-medium text-lg hover:bg-emerald-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-[#101010]'>
							판매자와 한 판 승부
						</button>
						<button className='pl-5 pr-3 group bg-indigo-600 hover:bg-pink-400 -ml-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-[#101010]'>
							{/* <div className='right-0 top-0 w-20 h-10 absolute bg-indigo-600 rounded-md group-hover:bg-pink-500 transition-colors '></div> */}

							<svg
								className='relative h-6 w-6 '
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								aria-hidden='true'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
			<div className='mt-24'>
				<h2 className='font-GmarketSans font-semibold text-3xl'>
					<span className='text-green-500'>더! 더! 많은</span> 갈-락-시
				</h2>
				<div className='mt-2 grid grid-cols-2 gap-x-2 gap-y-2'>
					{[1, 2, 3, 4, 5, 6].map((_, i) => (
						<div key={i}>
							<div className='bg-indigo-500 hover:bg-pink-500 w-full aspect-square rounded-md transition-colors' />

							<h3 className='font-medium mt-1'>Galaxy S60</h3>
							<p className='font-light text-gray-400 text-sm'>￦600,000</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Detail;
