import type { NextPage } from 'next';

const Create: NextPage = () => {
	return (
		<div className='bg-[#101010] text-[#fafafa] h-full min-h-screen font-SCoreDream px-4 py-12 space-y-4'>
			<div className='select-none space-y-2'>
				<label htmlFor='name' className='font-normal text-xs'>
					상품 이름
				</label>
				<div className='relative flex items-center'>
					<input
						type='text'
						id='name'
						placeholder='12억배 줌 카메라가 달린 갈락시 S8200'
						className='appearance-none text-gray-600 w-full bg-gray-200 rounded-sm placeholder-gray-400 outline-none focus:border-green-600 focus:ring-[2px] focus:ring-green-600'
					/>
				</div>
			</div>
			<div className='select-none space-y-2'>
				<label htmlFor='price' className='font-normal text-xs'>
					희망 상품금액
				</label>
				<div className='relative flex items-center'>
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
			<div className='space-y-2 select-none'>
				<label htmlFor='description' className='font-normal text-xs'>
					구매자의 심금을 울릴 4마디 랩가사
				</label>
				<textarea
					rows={4}
					id='description'
					className='appearance-none text-gray-600 w-full bg-gray-200 rounded-sm placeholder-gray-400 outline-none focus:border-green-600 focus:ring-[2px] focus:ring-green-600'
					placeholder='이해를 두 번 해도 일만 나면 오해'
				/>
			</div>
			<button className='w-full bg-green-600 rounded-sm py-2 hover:bg-emerald-500 font-medium focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition-color duration-100'>
				나의 지리는 상품을 보여주기
			</button>
		</div>
	);
};

export default Create;
