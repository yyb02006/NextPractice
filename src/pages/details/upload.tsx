import Input from '@/components/input';
import Layout from '@/components/layout';
import type { NextPage } from 'next';
import Button from '@/components/button';
import TextArea from '@/components/textarea';
import { useForm } from 'react-hook-form';
import useMutation from '@/libs/client/useMutation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Product } from '@prisma/client';
import useUser from '@/libs/client/useUser';

//서로 같은 폼 내에 있을 때는 인터페이스도 일치시켜서
interface ProductForm {
	title: string;
	price: number;
	description: string;
	image: FileList;
}

interface uploadMutationResult {
	success: boolean;
	product: Product;
}

const Upload: NextPage = () => {
	const { user } = useUser();
	const router = useRouter();
	const [uploadLoading, setUploadLoading] = useState(false);
	const [imagePreview, setImagePreview] = useState('');
	const [sendProduct, { loading, data, error }] =
		useMutation<uploadMutationResult>('/api/products');
	const { register, handleSubmit, watch } = useForm<ProductForm>();
	const image = watch('image');
	const onValid = async ({ title, price, description, image }: ProductForm) => {
		if (loading || uploadLoading) return;
		setUploadLoading((p) => (p = true));
		if (image && image.length > 0) {
			const { uploadURL } = await (await fetch(`/api/files`)).json();
			const form = new FormData();
			form.append('file', image[0], `${user.id.toString()}_product_${title}`);
			const {
				result: { id },
			} = await (await fetch(uploadURL, { method: 'POST', body: form })).json();
			sendProduct({ title, price, description, imageId: id });
		} else {
			sendProduct({ title, price, description });
		}
	};
	useEffect(() => {
		if (data?.product && data?.success) {
			router.push(`/details/${data.product.Id}`);
			setUploadLoading((p) => (p = false));
		}
	}, [data, router]);
	useEffect(() => {
		if (image && image.length > 0) {
			setImagePreview(URL.createObjectURL(image[0]));
		}
	}, [image]);
	return (
		<Layout canGoBack={true} seoTitle='G리는 상품'>
			<div className='bg-[#101010] text-[#fafafa] font-SCoreDream px-4 py-12 '>
				<form onSubmit={handleSubmit(onValid)} className='space-y-4'>
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
						<input
							{...register('image')}
							accept='image/*'
							type='file'
							className='hidden'
						/>
					</label>
					{imagePreview ? (
						<img
							src={imagePreview}
							alt='your product image'
							className='rounded-sm'
						/>
					) : null}
					<Input
						register={register('title', { required: '이름이 없습니다...' })}
						kind='text'
						label='질리지 않는 이름'
						name='title'
						placeholder='태희, 혜교, 지현이'
						required
					/>
					<Input
						register={register('price', { required: '가격이 아리마셍...' })}
						kind='price'
						label='내 욕심의 정도'
						name='price'
						placeholder='18,999'
						required
					/>
					<TextArea
						register={register('description', {
							required: '나 선적 없던 저 무댄 그래 풋내기 나의 목적',
						})}
						label='구매자의 심금을 울릴 4마디 랩가사'
						name='description'
						placeholder='이해를 두 번 해도 일만 나면 오해'
						rows={4}
						required
					></TextArea>
					<Button
						name={
							loading || uploadLoading
								? '상품 진열대에 올리는 중'
								: '상품 등록하기'
						}
					></Button>
				</form>
			</div>
		</Layout>
	);
};

export default Upload;
