import Input from '@/components/input';
import Layout from '@/components/layout';
import type { NextPage } from 'next';
import Button from '@/components/button';
import TextArea from '@/components/textarea';

const Upload: NextPage = () => {
	return (
		<Layout canGoBack={true}>
			<div className='bg-[#101010] text-[#fafafa] font-SCoreDream px-4 py-12 space-y-4'>
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
				<Input
					kind='price'
					label='내 욕심의 정도'
					name='price'
					placeholder='18,999'
					required
				/>
				<TextArea
					label='구매자의 심금을 울릴 4마디 랩가사'
					name='description'
					placeholder='이해를 두 번 해도 일만 나면 오해'
					rows={4}
				></TextArea>
				<Button name='상품 던져보기'></Button>
			</div>
		</Layout>
	);
};

export default Upload;
