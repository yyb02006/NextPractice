import type { NextPage } from 'next';

const Upload: NextPage = () => {
	return (
		<div className='bg-[#101010] text-[#fafafa] h-full min-h-screen font-SCoreDream px-4 py-12'>
			<div>
				<label className='group w-full h-40 flex justify-center items-center cursor-pointer border-2 border-dashed rounded-md border-gray-500 hover:border-emerald-400'>
					<svg
						className='h-12 w-12 bg-green-600 rounded-md shadow-md shadow-green-800 group-hover:bg-emerald-500 cursor-pointer'
						stroke='currentColor'
						fill='none'
						viewBox='0 0 48 48'
						aria-hidden='true'
					>
						<path
							d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
							strokeWidth={2}
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
					<input className='hidden' type='file' />
				</label>
			</div>
			<div className='mt-6 select-none'>
				<label htmlFor='price' className='font-light text-sm'>
					희망 상품금액
				</label>
				<div className='relative mt-2 flex items-center'>
					<div className='absolute pl-3 h-full flex items-center font-bold left-0 top-0 text-gray-500'>
						<span className='font-Roboto text-lg'>￦</span>
					</div>
					<input
						type='number'
						id='price'
						placeholder='0.00'
						className='appearance-none text-gray-600 pl-8 pr-12 w-full bg-gray-200 rounded-sm placeholder-gray-400 outline-none focus:border-green-600 focus:ring-[2px] focus:ring-green-600'
					/>
					<div>
						<span className='absolute font-Roboto pr-3 h-full flex items-center font-bold right-0 top-0 text-gray-500'>
							KRW
						</span>
					</div>
				</div>
			</div>
			<div className='mt-4 select-none'>
				<label htmlFor='description' className='font-light text-sm'>
					구매자의 심금을 울릴 4마디 랩가사
				</label>
				<div>
					<textarea
						rows={4}
						id='description'
						className='appearance-none mt-2 text-gray-600 w-full bg-gray-200 rounded-sm placeholder-gray-400 outline-none focus:border-green-600 focus:ring-[2px] focus:ring-green-600'
						placeholder='이해를 두 번 해도 일만 나면 오해'
					/>
				</div>
			</div>
			<button className='mt-4 w-full bg-green-600 rounded-sm py-2 hover:bg-emerald-500 font-medium focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition-color duration-100'>
				상품 던지기
			</button>
		</div>
	);
};

export default Upload;
