import Input from '@/components/input';
import Layout from '@/components/layout';
import type { NextPage } from 'next';

const EditProfile: NextPage = () => {
	return (
		<Layout canGoBack={true}>
			<div className='bg-[#101010] text-[#fafafa] font-SCoreDream px-4 py-12 space-y-4'>
				<div className='flex justify-center items-center'>
					<label
						htmlFor='picture'
						className='group cursor-pointer flex flex-col items-end'
					>
						<div className='bg-pink-400 w-32 aspect-square rounded-lg group-hover:bg-indigo-500 transition' />
						<span className='flex justify-center items-center text-gray-200 text-xs mt-1 transition-color'>
							사진 바꾸기
						</span>
						<input
							type='file'
							id='picture'
							accept='image/*'
							className='hidden'
						/>
					</label>
				</div>
				<div className='pt-4 space-y-4'>
					<Input
						kind='email'
						label='이-메일'
						name='email'
						placeholder='abcd@efuandyour.car'
					/>
					<Input
						kind='phone'
						label='폰-남바'
						name='phone'
						placeholder='010-1234-5678'
					/>
				</div>
				<button className='bg-green-600 w-full rounded-sm py-2 hover:bg-emerald-500 font-medium focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition-color duration-100'>
					수정완료
				</button>
			</div>
		</Layout>
	);
};

export default EditProfile;
