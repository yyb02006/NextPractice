import Layout from '@/components/layout';
import type { NextPage } from 'next';
import Button from '@/components/button';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const Detail: NextPage = () => {
	const router = useRouter();
	console.log(router.query);

	//optional query를 이렇게 구현하는 이유는, 옵셔널체이닝으로 router?.query.id를 쓰면 useRouter가 마운트되기 전에 undefined를 뱉게되고
	///api/products/undefined라는 주소를 불러오게 되기 때문.
	const {} = useSWR(
		router.query.id ? `/api/products/${router.query.id}` : null
	);
	return (
		<Layout title='상세정보' canGoBack={true}>
			<div className='bg-[#101010] text-[#fafafa] font-SCoreDream px-4 py-12'>
				<div>
					<div className='bg-indigo-600 w-full aspect-square rounded-md' />
					<div className='flex items-center gap-2 mt-4'>
						<div className='bg-pink-400 w-12 aspect-square rounded-md' />
						<div>
							<p className='font-medium text-lg'>Steve Jebs</p>
							<p className='font-normal text-xs text-gray-400 cursor-pointer hover:text-gray-300 hover:translate-x-1 transition'>
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
							bullshit about it ain&apos;t there, and we got to go someplace
							else and get it, I&apos;m gonna shoot you in the head then and
							there. Then I&apos;m gonna shoot that bitch in the kneecaps, find
							out where my goddamn money is. She gonna tell me too. Hey, look at
							me when I&apos;m talking to you, motherfucker. You listen: we go
							in there, and that ni**a Winston or anybody else is in there, you
							the first motherfucker to get shot. You understand?
						</p>
						<div className='mt-10 flex justify-start h-10'>
							<div className='z-[1] w-full'>
								<Button name='판매자와 한 판 승부'></Button>
							</div>
							<button className='pl-5 pr-3 group bg-indigo-600 hover:bg-pink-400 -ml-2 rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-[#101010]'>
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
		</Layout>
	);
};

export default Detail;
