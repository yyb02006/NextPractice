import Layout from '@/components/layout';
import type { NextPage } from 'next';
import Button from '@/components/button';
import TextArea from '@/components/textarea';
import useMutation from '@/libs/client/useMutation';
import { useForm } from 'react-hook-form';
import Input from '@/components/input';
import { Post } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { clsNm } from '@/libs/client/utils';

interface WriteForm {
	question: string;
	category: string;
}

interface WriteResponse {
	success: boolean;
	post: Post;
}

const Write: NextPage = () => {
	const [btnName, setBtnName] = useState('category');
	const [category, setCategory] = useState('');
	const router = useRouter();
	const [sendWrite, { loading, data }] = useMutation<WriteResponse>(
		'/api/communities/write'
	);
	const { register, handleSubmit } = useForm<WriteForm>();
	const onValid = (validData: WriteForm) => {
		if (loading) return;
		sendWrite(validData);
		console.log(validData);
	};
	useEffect(() => {
		if (data?.post && data?.success) {
			router.push(`/communities/${data.post.Id}`);
		}
	}, [data, router]);
	const onSelect = (e: any) => {
		if (category === e.target.value) {
			setCategory((p) => (p = ''));
			return;
		}
		setCategory(e.target.value);
	};
	return (
		<Layout canGoBack={true}>
			<form
				onSubmit={handleSubmit(onValid)}
				className='bg-[#101010] text-[#fafafa] font-SCoreDream px-4 py-12 space-y-4'
			>
				<div className='space-y-3'>
					<label
						htmlFor='computer'
						className={clsNm(
							category === '콤-퓨타'
								? 'bg-indigo-600 shadow-indigo-800'
								: 'bg-green-600 shadow-green-800 hover:bg-indigo-500 hover:shadow-indigo-600',
							'inline-block mr-3 shadow-md active:bg-indigo-600 font-medium text-sm rounded-sm px-4 py-2'
						)}
					>
						<input
							id='computer'
							onClick={onSelect}
							type='radio'
							value='콤-퓨타'
							className='hidden'
						/>
						콤-퓨타
					</label>
					<label
						htmlFor='cartoon'
						className={clsNm(
							category === '만화'
								? 'bg-indigo-600 shadow-indigo-800'
								: 'bg-green-600 shadow-green-800 hover:bg-indigo-500 hover:shadow-indigo-600',
							'inline-block mr-3 shadow-md active:bg-indigo-600 font-medium text-sm rounded-sm px-4 py-2'
						)}
					>
						<input
							id='cartoon'
							onClick={onSelect}
							type='radio'
							value='만화'
							className='hidden'
						/>
						만화
					</label>
					<label
						htmlFor='deliveryFood'
						className={clsNm(
							category === '배달음식'
								? 'bg-indigo-600 shadow-indigo-800'
								: 'bg-green-600 shadow-green-800 hover:bg-indigo-500 hover:shadow-indigo-600',
							'inline-block mr-3 shadow-md active:bg-indigo-600 font-medium text-sm rounded-sm px-4 py-2'
						)}
					>
						<input
							id='deliveryFood'
							onClick={onSelect}
							type='radio'
							value='배달음식'
							className='hidden'
						/>
						배달음식
					</label>
				</div>
				{/* <Input
					kind='text'
					name='category'
					label='카테고리'
					placeholder=''
					register={register('category', { required: false })}
				></Input> */}
				<TextArea
					label='궁금한 내용을 적어주십사와용'
					name='question'
					placeholder='난 내가 누군지 몰라 이 세상을 헤맬뿐야'
					rows={4}
					register={register('question', {
						required: '질문지를 작성해주say-yo!',
					})}
					required
				></TextArea>
				<Button
					name={loading ? '쥐-식인 논문 제출중...' : '쥐-마켓 쥐-식인 믿어보기'}
				></Button>
			</form>
		</Layout>
	);
};

export default Write;
