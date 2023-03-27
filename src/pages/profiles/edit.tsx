import type { NextPage } from 'next';

const EditProfile: NextPage = () => {
	return (
		<div className='bg-[#101010] text-[#fafafa] h-full min-h-screen font-SCoreDream px-4 py-12 space-y-4'>
			<div className='flex justify-center items-center'>
				<label
					htmlFor='picture'
					className='group cursor-pointer flex flex-col items-end'
				>
					<div className='bg-pink-400 w-32 aspect-square rounded-lg group-hover:bg-indigo-500 transition' />
					<span className='flex justify-center items-center text-gray-200 text-xs mt-1 transition-color'>
						사진 바꾸기
					</span>
					<input type='file' id='picture' accept='image/*' className='hidden' />
				</label>
			</div>
			<div className='pt-4'>
				<label htmlFor='email' className='font-normal text-sm text-gray-300'>
					이-메일
				</label>
				<div className='flex mt-2'>
					<input
						type='email'
						id='email'
						className='appearance-none w-full bg-gray-200 rounded-sm placeholder-gray-400 font-medium outline-none focus:border-green-600 focus:ring-[2px] focus:ring-green-600'
						placeholder='abcd@gmail.com'
						required
					/>
				</div>
			</div>
			<div>
				<label htmlFor='email' className='font-normal text-sm text-gray-300'>
					폰-남바
				</label>
				<div className='flex mt-2'>
					<span className='flex justify-center items-center border border-r-0 border-gray-500 text-gray-400 text-sm px-3 rounded-l-sm select-none font-medium'>
						+82
					</span>
					<input
						className='appearance-none w-full bg-gray-200 border-gray-300 text-[#101010] placeholder-gray-400 font-medium focus:border-green-600 focus:ring-[2px] focus:ring-green-600 rounded-r-sm'
						type='number'
						id='phone'
						placeholder='010-1234-5678'
						required
					/>
				</div>
			</div>
			<button className='bg-green-600 w-full rounded-sm py-2 hover:bg-emerald-500 font-medium focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition-color duration-100'>
				수정완료
			</button>
		</div>
	);
};

export default EditProfile;
